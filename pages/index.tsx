import { Button, Divider, FormControl, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from '@chakra-ui/react';
import Blade from  '../layout/Blade';
import { match_up_markets, outright_markets, tours, types } from '../database/database';
import React from 'react';


export default function Home() {
  const [type, setType] = React.useState(''); 
  const [market, setMarket] = React.useState('');
  const [tour, setTour] = React.useState('');
  const [ev, setEv] = React.useState(0);

  const checkValid = () => {
    if (type === '' || market === '') {
      return false;
    } else {
      return true;
    }
  }

  const handleRequest = () => {
    if (!checkValid) {
      return;
    }

    fetch('/api/handle-datagolf-request', {
      method: 'POST',
      body: JSON.stringify({
        type: type,
        market: market,
        tour: tour,
      }),
    })
  }

  return (
    <Blade>
      <HStack my="4">
        <FormControl>
          <FormLabel as="legend">Type</FormLabel>
          <Select onChange={(e) => {setType(e.target.value); setMarket('')}} placeholder="Select Bet Type">
            {types.map((t) => (
              <option value={t} key={t}>{t}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel as="legend">Tour</FormLabel>
          <Select onChange={(e) => setTour(e.target.value)} placeholder="Select Tour">
            {tours.map((tour) => (
              <option value={tour} key={tour}>{tour}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel as="legend">Market</FormLabel>
          <Select onChange={(e) => setMarket(e.target.value)} placeholder="Select Market">
            {type === 'matchups' ? match_up_markets.map((m) => (
              <option value={m} key={m}>{m}</option>
            )) : type === 'outrights' ? outright_markets.map((o) => (
              <option value={o} key={o}>{o}</option>
            )) : null }
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel as="legend">Expected Value</FormLabel>
          <NumberInput allowMouseWheel defaultValue={0} min={0} max={500} placeholder="0%" >
            <NumberInputField onChange={(e) => setEv(Number(e.target.value))} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <Button disabled={!checkValid()} onClick={handleRequest}>Find Bets</Button>
      <Divider my={4} />
    </Blade>
  )
}
