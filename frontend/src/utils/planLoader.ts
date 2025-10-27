/**
 * Plan Loader Utility
 * Loads plans from localStorage if admin has customized them, otherwise returns defaults
 */
import { PLANS } from '../data/plans';
import { Plans } from '../types/auth';

export const getPlans = (): Plans => {
  try {
    const customPlans = localStorage.getItem('customPlans');
    if (customPlans) {
      return JSON.parse(customPlans) as Plans;
    }
  } catch (error) {
    console.error('Error loading custom plans:', error);
  }
  return PLANS;
};

export const resetPlansToDefault = (): void => {
  localStorage.removeItem('customPlans');
};
