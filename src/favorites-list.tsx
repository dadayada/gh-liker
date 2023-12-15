import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import {
  favoriteRepositoriesVar,
  repositoriesRatings,
} from './favorites-state';
import { FavoriteItem } from './favorite-item';

export const FavoritesList: FC = () => {
  const favorites = useReactiveVar(favoriteRepositoriesVar);
  const ratings = useReactiveVar(repositoriesRatings);

  return (
    <Box sx={{ width: '100%' }}>
      {favorites.size > 0 ? (
        Array.from(favorites).map(repoId => (
          <FavoriteItem
            repoId={repoId}
            rating={ratings.get(repoId)}
            key={repoId}
          />
        ))
      ) : (
        <Typography align='center' variant='h6'>No favorites yet</Typography>
      )}
    </Box>
  );
};
