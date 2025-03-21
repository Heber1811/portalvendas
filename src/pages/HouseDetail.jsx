import { Box, Container, Text, Image, SimpleGrid, Button, Link, Modal, ModalOverlay, ModalContent, ModalBody, IconButton, useDisclosure, Flex } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import casa1Foto1 from '../assets/images/casa1.jpg'
import casa1Foto2 from '../assets/images/casa1.jpg'
import casa1Foto3 from '../assets/images/casa1.jpg'
import casa2Foto1 from '../assets/images/casa2.jpeg'
import casa2Foto2 from '../assets/images/casa2.jpeg'
import casa2Foto3 from '../assets/images/casa2.jpeg'

const casasDetalhes = {
  1: {
    titulo: 'Casa Moderna no Jardim Primavera',
    descricao: 'Linda casa com 3 quartos, 2 banheiros, sala ampla e cozinha planejada.',
    fotos: [casa1Foto1, casa1Foto2, casa1Foto3],
    preco: 'R$ 500.000,00',
    area: '150m²',
    quartos: 3,
    banheiros: 2
  },
  2: {
    titulo: 'Casa Espaçosa no Centro',
    descricao: 'Casa com 4 quartos, 3 banheiros, jardim e área gourmet.',
    fotos: [casa2Foto1, casa2Foto2, casa2Foto3],
    preco: 'R$ 750.000,00',
    area: '200m²',
    quartos: 4,
    banheiros: 3
  }
}

function HouseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const casa = casasDetalhes[id]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % casa.fotos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + casa.fotos.length) % casa.fotos.length)
  }

  // Adicionando handler para teclas
  const handleKeyDown = (event) => {
    if (!isOpen) return
    
    if (event.key === 'ArrowRight') {
      nextImage()
    } else if (event.key === 'ArrowLeft') {
      prevImage()
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  // Adicionando e removendo event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!casa) {
    return (
      <Box 
        width="100vw" 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="#f5f5f5"
      >
        <Text>Casa não encontrada</Text>
      </Box>
    )
  }

  return (
    <Box 
      width="100vw" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="#f5f5f5"
    >
      <Container maxW="1200px" py={10}>
        {/* New Header Section */}
        <Flex alignItems="center" mb={6} gap={4} justifyContent="space-between">
          <IconButton
            icon={<FaArrowLeft />}
            onClick={() => navigate('/')}
            aria-label="Voltar para home"
            colorScheme="blue"
            variant="solid"
            size="lg"
            borderRadius="full"
            boxShadow="md"
            _hover={{ 
              transform: 'translateX(-2px)',
              boxShadow: 'lg'
            }}
            transition="all 0.2s"
          />
          <Link 
            href="https://wa.me/SEUNUMERO?text=Olá,%20tenho%20interesse%20na%20casa"
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
        </Flex>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            {casa.titulo}
          </Text>

          <Box mb={8}>
            <Text fontSize="xl" mb={4}>
              {casa.descricao}
            </Text>
            
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mb={6}>
              <Box p={4} bg="gray.100" borderRadius="md">
                <Text fontWeight="bold">Preço</Text>
                <Text>{casa.preco}</Text>
              </Box>
              <Box p={4} bg="gray.100" borderRadius="md">
                <Text fontWeight="bold">Área</Text>
                <Text>{casa.area}</Text>
              </Box>
              <Box p={4} bg="gray.100" borderRadius="md">
                <Text fontWeight="bold">Quartos</Text>
                <Text>{casa.quartos}</Text>
              </Box>
              <Box p={4} bg="gray.100" borderRadius="md">
                <Text fontWeight="bold">Banheiros</Text>
                <Text>{casa.banheiros}</Text>
              </Box>
            </SimpleGrid>
          </Box>

          <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={8}>
            {casa.fotos.map((foto, index) => (
              <Image
                key={index}
                src={foto}
                alt={`Foto ${index + 1}`}
                borderRadius="lg"
                cursor="pointer"
                onClick={() => {
                  setCurrentImageIndex(index)
                  onOpen()
                }}
              />
            ))}
          </SimpleGrid>

          {/* <Box textAlign="center">
            <Link 
              href="https://wa.me/SEUNUMERO?text=Olá,%20tenho%20interesse%20na%20casa"
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
          </Box> */}
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody position="relative" p={0}>
            <IconButton
              icon={<FaTimes />}
              position="absolute"
              right={2}
              top={2}
              onClick={onClose}
              bg="white"
              zIndex={2}
            />
            <IconButton
              icon={<FaChevronLeft />}
              position="absolute"
              left={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={prevImage}
              bg="white"
              zIndex={2}
            />
            <IconButton
              icon={<FaChevronRight />}
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={nextImage}
              bg="white"
              zIndex={2}
            />
            <Image
              src={casa.fotos[currentImageIndex]}
              alt={`Foto ${currentImageIndex + 1}`}
              w="100%"
              h="90vh"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default HouseDetail