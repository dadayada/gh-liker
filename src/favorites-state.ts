import { makeVar } from '@apollo/client';

export const favoriteRepositoriesVar = makeVar<Set<string>>(new Set());
export const repositoriesRatings = makeVar<Map<string, number>>(new Map());

export const addToFavorites = (repoId: string) => {
  favoriteRepositoriesVar(new Set([...favoriteRepositoriesVar(), repoId]));
};

export const removeFromFavorites = (repoId: string) => {
  const currentFavorites = favoriteRepositoriesVar();
  const currentRatings = repositoriesRatings();
  if (currentRatings.has(repoId)) {
    currentRatings.delete(repoId);
  }
  currentFavorites.delete(repoId);
  favoriteRepositoriesVar(new Set([...currentFavorites]));
};

export const rateRepository = (repoId: string, rating: number | null) => {
  const currentRatings = repositoriesRatings();
  if (rating === null) {
    currentRatings.delete(repoId);
  } else {
    currentRatings.set(repoId, rating);
  }
  repositoriesRatings(new Map(currentRatings));
};
