import React, { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from '../Button';
import { theme } from '@/shared/constants';
import { styles } from './ScreenState.styles';

export interface ScreenStateProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  retryTitle?: string;
}

/**
 * Unified state placeholder for list screens and containers.
 * Handles Loading, Error, and Empty states gracefully.
 * Returns null when there is normal content to display.
 */
export const ScreenState = memo(
  ({
    isLoading = false,
    error = null,
    isEmpty = false,
    emptyMessage = 'No items found',
    onRetry,
    retryTitle = 'Try Again',
  }: ScreenStateProps) => {
    if (isLoading) {
      return (
        <View style={[styles.container, styles.loaderContainer]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
          {Boolean(onRetry) && (
            <Button
              title={retryTitle}
              onPress={onRetry}
              style={styles.retryButton}
            />
          )}
        </View>
      );
    }

    if (isEmpty) {
      return (
        <View style={styles.container}>
          <Text style={styles.messageText}>{emptyMessage}</Text>
        </View>
      );
    }

    return null;
  }
);

ScreenState.displayName = 'ScreenState';
