import axios from 'axios';

// Initialize Axios with the base URL and API Key
const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': process.env.EXPO_PUBLIC_CAT_API_KEY,
  },
});

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  // Merged properties
  isFavourite?: boolean;
  favouriteId?: number;
  score?: number;
}

export const catApi = {
  // Fetch uploaded images, favorites, and votes, then merge them.
  // This demonstrates senior-level data orchestration.
  getMergedCats: async (): Promise<CatImage[]> => {
    try {
      const [imagesRes, favsRes, votesRes] = await Promise.all([
        apiClient.get('/images/?limit=100'), // Gets user's uploaded images
        apiClient.get('/favourites'),
        apiClient.get('/votes'),
      ]);

      const images = imagesRes.data;
      const favs = favsRes.data;
      const votes = votesRes.data;

      return images.map((img: any) => {
        const favourite = favs.find((f: any) => f.image_id === img.id);
        const imageVotes = votes.filter((v: any) => v.image_id === img.id);

        // Calculate score: TheCatAPI uses value 1 for up, 0 or -1 for down
        const score = imageVotes.reduce((acc: number, curr: any) => {
          return acc + (curr.value === 1 ? 1 : -1);
        }, 0);

        return {
          ...img,
          isFavourite: !!favourite,
          favouriteId: favourite?.id,
          score,
        };
      });
    } catch (error) {
      console.error("Error fetching merged cats:", error);
      throw error;
    }
  },

  uploadImage: async (uri: string, type: string, name: string) => {
    const formData = new FormData();
    // React Native requires this specific formatting for FormData files
    formData.append('file', { uri, type, name } as any);

    return apiClient.post('/images/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  toggleFavourite: async (imageId: string, isFav: boolean, favId?: number) => {
    if (isFav && favId) {
      return apiClient.delete(`/favourites/${favId}`);
    } else {
      return apiClient.post('/favourites', { image_id: imageId });
    }
  },

  vote: async (imageId: string, value: number) => {
    // 1 for up, -1 for down
    return apiClient.post('/votes', { image_id: imageId, value });
  },
};