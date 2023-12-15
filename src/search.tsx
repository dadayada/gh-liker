import { useCallback } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { throttle } from 'lodash';
import {
  Container,
  List,
  ListItem,
  TextField,
  ListItemText,
  IconButton,
  LinearProgress,
  Box,
  Link,
} from '@mui/material';
import { StarBorder, StarRate } from '@mui/icons-material';
import './app.css';
import {
  addToFavorites,
  favoriteRepositoriesVar,
  removeFromFavorites,
} from './favorites-state';
import { SEARCH_FOR_REPOSITORIES_QUERY } from './queries';

export function Search() {
  const favorites = useReactiveVar(favoriteRepositoriesVar);
  const [searchRepos, { data, previousData, loading, error }] = useLazyQuery(
    SEARCH_FOR_REPOSITORIES_QUERY
  );

  const repositoriesResult = loading ? previousData : data;

  const onSearchChangeDebounced = useCallback(
    throttle<React.ChangeEventHandler<HTMLInputElement>>(e => {
      searchRepos({
        variables: { query: e.target.value },
      });
    }, 800),
    [searchRepos]
  );

  const onStarClick = (repoId: string) => {
    if (favorites.has(repoId)) {
      removeFromFavorites(repoId);
    } else {
      addToFavorites(repoId);
    }
  };
  return (
    <Container maxWidth='md'>
      <TextField
        margin='normal'
        type='search'
        fullWidth
        placeholder='Search for repositories'
        onChange={onSearchChangeDebounced}
      />
      <Box height={16} pt={1}>
        {loading && <LinearProgress />}
      </Box>
      <Container maxWidth='md'>
        {error && 'Unexpected error'}
        {repositoriesResult?.search.nodes &&
          repositoriesResult?.search.nodes?.length > 0 && (
            <List
              sx={{
                border: '1px solid lightGrey',
                borderRadius: 1,
                padding: 0,
              }}
            >
              {repositoriesResult?.search.nodes?.map(
                node =>
                  node?.__typename === 'Repository' && (
                    <ListItem
                      key={node.id}
                      sx={{ borderTop: '1px solid lightGrey' }}
                      secondaryAction={
                        <IconButton
                          onClick={() => onStarClick(node.id)}
                          title={
                            favorites.has(node.id)
                              ? 'Remove from favorites'
                              : 'Set as favorite'
                          }
                        >
                          {favorites.has(node.id) ? (
                            <StarRate color='primary' />
                          ) : (
                            <StarBorder />
                          )}
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Link href={node.url}>
                            {node.owner.login} / {node.name}
                          </Link>
                        }
                        secondary={
                          <>
                            {node.stargazerCount}{' '}
                            <StarRate
                              fontSize='inherit'
                              sx={{ verticalAlign: 'text-top' }}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  )
              )}
            </List>
          )}
      </Container>
    </Container>
  );
}
