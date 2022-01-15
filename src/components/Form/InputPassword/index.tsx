import React from 'react'
import { FieldError } from 'react-hook-form'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

import {
  Button,
  Icon,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  InputProps,
} from '@chakra-ui/react'

import { Error } from '~/components/Error'

interface InputPasswordProps extends InputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputPasswordBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputPasswordProps
> = ({ name, label, error = null, ...rest }, ref) => {
  const [show, setShow] = React.useState<boolean>(false)

  const handleClick = () => setShow(!show)

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize={'md'} fontWeight={'bold'}>
          {label}
        </FormLabel>
      )}

      <InputGroup>
        <Input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          focusBorderColor="purple.500"
          bgColor={'white'}
          variant={'outline'}
          size={'lg'}
          _hover={{
            borderColor: 'purple.500',
          }}
          ref={ref}
          {...rest}
        />
        <InputRightElement height={'100%'}>
          <Button
            variant="ghost"
            size="md"
            _hover={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            onClick={handleClick}
          >
            <Icon
              as={show ? RiEyeOffLine : RiEyeLine}
              color={'#7D40E7'}
              _focus={{ color: 'red' }}
              boxSize={'1.2rem'}
            />
          </Button>
        </InputRightElement>
      </InputGroup>

      {!!error && <Error message={error} />}
    </FormControl>
  )
}

export const InputPassword = React.forwardRef(InputPasswordBase)
