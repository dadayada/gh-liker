import { FC } from 'react';
import { Box, IconButton, Paper, Rating, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import {
  rateRepository,
  removeFromFavorites,
} from './favorites-state';
import { Delete } from '@mui/icons-material';
import { GET_REPOSITORY } from './queries';

export const FavoriteItem: FC<{ repoId: string; rating: number | undefined }> = ({
  repoId,
  rating,
}) => {
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id: repoId },
  });
  const repository = data?.node?.__typename === 'Repository' ? data.node : null;
  return (
    repository && (
      <Paper
        sx={{ margin: 1, padding: 1, display: 'flex' }}
        key={repository.id}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h6'>
            {repository.owner.login} / {repository.name}
          </Typography>
          <Box display='flex'>
            <Rating
              title='Rate this repository'
              value={rating || null}
              onChange={(_, newValue) =>
                rateRepository(repository.id, newValue)
              }
            />
            <Typography>
              {rating ? `(${rating} out of 5)` : 'Not rated yet'}
            </Typography>
          </Box>
          <Typography>{repository.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center' }}>
          <IconButton onClick={() => removeFromFavorites(repository.id)}>
            <Delete color='primary' />
          </IconButton>
        </Box>
      </Paper>
    )
  );
};