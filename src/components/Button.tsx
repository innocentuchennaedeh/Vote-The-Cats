import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button = ({ title, onPress, variant = 'primary', loading, disabled, style }: ButtonProps) => {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        disabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? "#FF6B6B" : "#FFF"} />
      ) : (
        <Text style={[styles.text, isSecondary ? styles.secondaryText : styles.primaryText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#FF6B6B'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B6B'
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: 12
  },
  primaryText: {
    color: '#FFF'
  },
  secondaryText: {
    color: '#FF6B6B'
  },
});