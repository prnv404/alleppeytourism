/**
 * @deprecated This file is deprecated. Use imports from '@/lib/data' and '@/types' instead.
 * This file is kept for backward compatibility during migration.
 * 
 * Migration guide:
 * - Types: import { Activity, ActivityImage, ... } from '@/types'
 * - Data: import { activities, ACTIVITIES, DESTINATIONS } from '@/lib/data'
 */

// Re-export types from new location
export type {
  Activity,
  ActivityImage,
  ActivityType,
  ActivitySpec,
  ActivityVariant,
  ActivityDuration,
  CruiseType,
  Destination,
} from '@/types';

// Re-export data from new location
export {
  ACTIVITIES as PACKAGES,
  activities,
  DESTINATIONS as destinations,
  getActivityById,
  getActivitiesByType,
} from '@/lib/data';
