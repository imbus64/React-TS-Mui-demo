import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Explicitly defined props for Even component
interface EvenProps {
  even: boolean;
}

// Even component, like regular React component, but with explicit props type
function Even({ even }: EvenProps): JSX.Element {
  return even === true ? <p>Even</p> : <p>Uneven</p>
}

// Same as above, but with unnamed props type
function Prime({ prime }: { prime: boolean }): JSX.Element {
  return prime === true ? <p>Prime</p> : <p>Not Prime</p>
}

// Just a helper function to check if a number is prime
function IsPrime(int: number): boolean {
  if (int < 2 || int % 2 === 0) return false

  for (let i = 3; i <= Math.sqrt(int); i += 2) {
    if (int % i === 0) return false
  }
  return true
}

// JSX.Element is the return type of every React component
function App(): JSX.Element {
  const [count, setCount] = useState(0)
  const [even, setEven] = useState(count % 2 === 0) // Coule be unset, since it's calculated from count
  const [prime, setPrime] = useState(IsPrime(count)) // Coule also be unset, as in useState(false), for example

  // Effect with a dependency array of [count]
  // Recalculates even and prime when count changes
  useEffect((): void => {
    setEven(count % 2 === 0)
    setPrime(IsPrime(count))
  }, [count]);

  return (
    <>
      <Box>
        <Even even={even} />
        <Prime prime={prime} />
      </Box>
      <Box>
        {
        // Lambdas are expressed as usual () => {}, but with the return and 
        // parameter types specified as in (arg: number): number => arg + 1 
        }
        <Button variant='contained' onClick={(): void => setCount((count): number => count + 1)}>
          count is {count}
        </Button>
      </Box>
    </>
  )
}

export default App
