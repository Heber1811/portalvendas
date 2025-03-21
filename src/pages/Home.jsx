import { Box, Container, Text, SimpleGrid, Image, Card, CardBody, CardFooter, Button, Link } from '@chakra-ui/react'
import { House } from 'phosphor-react'  // Changed from HouseIcon
import { useNavigate } from 'react-router-dom'
import casa1 from '../assets/images/casa1.jpg'
import casa2 from '../assets/images/casa2.jpeg'
import { FaWhatsapp } from 'react-icons/fa'

const casas = [
  {
    id: 1,
    imagem: casa1,
    endereco: 'Rua das Flores, 123 - Jardim Primavera'
  },
  {
    id: 2,
    imagem: casa2,
    endereco: 'Avenida Principal, 456 - Centro'
  },

]

function Home() {
  const navigate = useNavigate()

  return (
    <Box 
      width="100vw" 
      minH="100vh" 
      bg="#f5f5f5"
      position="relative"
    >
      {/* Header Fixo Novo */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="70px"
        bg="white"
        boxShadow="sm"
        zIndex="1000"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontSize={["xl", "2xl", "3xl"]} 
          fontWeight="bold" 
          display="flex"
          alignItems="center"
          gap={2}
        >
          Imóveis <House size={32} weight="fill" />
        </Text>
      </Box>

      {/* Container Principal (ajustado com margem top para o header) */}
      <Box 
        pt="120px" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Container centerContent maxW="1200px" px={[4, 6, 8]} py={[2, 3, 4]}>
          <SimpleGrid 
            columns={[1, null, 2]} 
            spacing={10}
            width="100%"
            maxW="1200px"
            justifyItems="center"
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="sm"
          >
            {casas.map((casa) => (
              <Card 
                key={casa.id}
                cursor="pointer"
                onClick={() => navigate(`/casa/${casa.id}`)}
                _hover={{ transform: 'scale(1.02)' }}
                transition="all 0.2s"
                maxW="600px"
                width="100%"
                border=" 1px"
                borderColor="gray.300"
                boxShadow="md"
              >
                <CardBody>
                  <Image
                    src={casa.imagem}
                    alt={`Casa ${casa.id}`}
                    borderRadius="lg"
                    objectFit="cover"
                    height="300px"
                    width="100%"
                  />
                </CardBody>
                <CardFooter
                  borderTop="1px"
                  borderColor="gray.200"
                  py={4}
                >
                  <Text fontWeight="medium" color="gray.700">{casa.endereco}</Text>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* WhatsApp icon permanece igual */}
      <Link 
        href="https://wa.me/SEUNUMERO?text=Olá,%20tenho%20interesse%20em%20conhecer%20os%20imóveis"
        isExternal
        position="fixed"
        bottom="2rem"
        right="2rem"
        bg="green.500"
        w="60px"
        h="60px"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
        _hover={{
          transform: 'scale(1.1)',
          bg: 'green.600'
        }}
        transition="all 0.2s"
      >
        <FaWhatsapp size={32} color="white" />
      </Link>
    </Box>
  )
}

export default Home