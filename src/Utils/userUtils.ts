import { User } from "Api/GeneratedApi";

export const checkUserHasSubscribtion = (user: User): boolean => {
  return !!(
    user.subscription && new Date(user.subscription.end_date) > new Date()
  );
};
