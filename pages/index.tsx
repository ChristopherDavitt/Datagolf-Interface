import { Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select as ChakraSelect, Stack } from '@chakra-ui/react';
import Blade from  '../layout/Blade';
import { match_up_markets, outright_markets, sports_books, tours, types } from '../database/database';
import React from 'react';
import Select from 'react-select';
import InputOption from '../components/InputOption';

function CheckboxList(
  { items, onChange }:
  {items:any, onChange: any }
) {
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }

    if (onChange) {
      onChange([...checkedItems, value]);
    }
  };

  return (
    <Stack spacing={2}>
      {items.map((item: any) => (
        <Checkbox
          key={item}
          value={item}
          isChecked={checkedItems.includes(item)}
          onChange={handleCheckboxChange}
        >
          {item}
        </Checkbox>
      ))}
    </Stack>
  );
}

export default function Home() {
  const [type, setType] = React.useState(''); 
  const [market, setMarket] = React.useState('');
  const [tour, setTour] = React.useState('');
  const [ev, setEv] = React.useState(0);
  const [json, setJson] = React.useState();
  const [sportsBooks, setSportsBooks] = React.useState<string[]>([]);

  const checkValid = () => {
    if (type === '' || market === '' || tour === '') {
      return false;
    } else {
      return true;
    }
  };

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;

    if (checked) {
      setSportsBooks([...sportsBooks, value]);
    } else {
      setSportsBooks(sportsBooks.filter((item) => item !== value));
    }
  };

  const handleRequest = async () => {
    if (!checkValid) {
      return;
    }

    await fetch(`/api/handle-datagolf/${type}/${market}/${tour}`)
      .then(res => res.json())
      .then(data => setJson(data));
  }

  return (
    <Blade>
      <HStack my="4">
        <FormControl>
          <FormLabel as="legend">Type</FormLabel>
          <ChakraSelect onChange={(e) => {setType(e.target.value); setMarket('')}} placeholder="Select Bet Type">
            {types.map((t) => (
              <option value={t} key={t}>{t}</option>
            ))}
          </ChakraSelect>
        </FormControl>
        <FormControl>
          <FormLabel as="legend">Tour</FormLabel>
          <ChakraSelect onChange={(e) => setTour(e.target.value)} placeholder="Select Tour">
            {tours.map((tour) => (
              <option value={tour} key={tour}>{tour}</option>
            ))}
          </ChakraSelect>
        </FormControl>
        <FormControl>
          <FormLabel as="legend">Market</FormLabel>
          <ChakraSelect onChange={(e) => setMarket(e.target.value)} placeholder="Select Market">
            {type === 'matchups' ? match_up_markets.map((m) => (
              <option value={m} key={m}>{m}</option>
            )) : type === 'outrights' ? outright_markets.map((o) => (
              <option value={o} key={o}>{o}</option>
            )) : null }
          </ChakraSelect>
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
        <FormControl>
          <FormLabel>Sports Books</FormLabel>
          <Select
            defaultValue={[]}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(options) => {
              if (Array.isArray(options)) {
                setSportsBooks(options.map((opt) => opt.value));
              }
            }}
            options={sports_books.map((book) => { return { value: book, label: book } })}
            components={{
              Option: InputOption
            }}
          />
        </FormControl>
      </HStack>
      <Button disabled={!checkValid()} onClick={handleRequest}>Find Bets</Button>
      <Divider my={4} />
    </Blade>
  )
}
