import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, VStack } from '@chakra-ui/react';
import { SearchItem, SearchItemProps } from './SearchItem';
import { isTemplateExpression } from 'typescript';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (searchText !== '') {
       axios.get('/myApi/search' + '?q=' + searchText)
       .then((response) => {
        const parsedData = response.data.tracks.items.map((track: any)=> {
          return {
            imageUrl: track.album.images[0].url,
            title: track.name,
            subtitle: track.artists[0].name
          }
        })
        setSearchResults(parsedData)
        setLoading(false)
      })
    }
    };

    fetchData();
  }, [searchText]);

  return (
    <VStack>
      <Input
        variant="filled"
        placeholder="Search for a song"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(e.target.value)
          console.log(e.target.value)
        }}
      />
      {searchResults && !loading ? (
        <>
          {searchResults.map((trackInfo, index) => {
            console.log(trackInfo)
            return <SearchItem key={index} {...trackInfo} />
      })}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </VStack>
  );
};

export default Search;
