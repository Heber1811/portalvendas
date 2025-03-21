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
  }
]

function Home() {
  const navigate = useNavigate()

  return (
    <Box 
      width="100vw" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="#f5f5f5"
    >
      <Container centerContent maxW="1200px" px={[4, 6, 8]} py={[6, 8, 10]}>
        <Box textAlign="center" mb={10}>
          <Text 
            fontSize={["xl", "2xl", "3xl"]} 
            fontWeight="bold" 
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            Imóveis <House size={32} weight="fill" />
          </Text>
        </Box>

        <SimpleGrid 
          columns={[1, null, 2]} 
          spacing={10}
          width="100%"
          maxW="900px"
          justifyItems="center"
          bg="white"  // Adicionando fundo branco ao grid
          p={8}      // Adicionando padding
          borderRadius="lg"  // Adicionando borda arredondada
          boxShadow="sm"    // Adicionando sombra suave
        >
          {casas.map((casa) => (
            <Card 
              key={casa.id}
              cursor="pointer"
              onClick={() => navigate(`/casa/${casa.id}`)}
              _hover={{ transform: 'scale(1.02)' }}
              transition="all 0.2s"
              maxW="400px"
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

        <Box textAlign="center" mt={8}>
          <Link 
            href="https://wa.me/SEUNUMERO?text=Olá,%20tenho%20interesse%20em%20conhecer%20os%20imóveis"
            isExternal
          >
            <Button
              colorScheme="green"
              leftIcon={<FaWhatsapp />}
              size="lg"
            >
              Contatar via WhatsApp
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}

export default Home