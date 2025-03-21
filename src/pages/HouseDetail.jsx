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
import { House } from '@phosphor-icons/react'

const casasDetalhes = {
  1: {
    titulo: 'Casa Moderna no Jardim Primavera',
    bairro: 'Jardim Primavera',
    descricao: 'Linda casa com 3 quartos, 2 banheiros, sala ampla e cozinha planejada.',
    fotos: [casa1Foto1, casa1Foto2, casa1Foto3],
    preco: 'R$ 500.000,00',
    area: '150m²',
    quartos: 3,
    banheiros: 2
  },
  2: {
    titulo: 'Casa Espaçosa no Centro',
    bairro: 'Centro',
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
    <Box width="100vw" h="100vh" bg="#f5f5f5" overflow="auto">
      {/* Header Fixo */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="white"
        boxShadow="sm"
        zIndex={10}
        height="80px" // Se necessário, defina uma altura fixa para o cabeçalho
      >
        <Box px={2} py={4}>
          <Flex alignItems="center" gap={4} justifyContent="space-between">
            <Button
              onClick={() => navigate('/')}
              colorScheme="blue"
              size="lg"
              boxShadow="md"
              _hover={{
                transform: 'translateX(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Início
            </Button>
            <Flex alignItems="center" gap={2}>
              <House size={32} weight="fill" />
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                {casa.bairro}
              </Text>
            </Flex>
            <Link href="https://wa.me/SEUNUMERO?text=Olá,%20tenho%20interesse%20na%20casa" isExternal>
              <Button colorScheme="green" leftIcon={<FaWhatsapp />} size="lg">
                Contato
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>

      <Container
        maxW="1200px"
        py={8}
        px={4}
        mx="auto"
        w="100%"
        pt="100px"
      >
        <Box
          bg="white"
          p={[4, 6, 8]}
          borderRadius="lg"
          boxShadow="md"
          w="100%"
          m={[4, 6]}  // Adiciona margem ao redor do Box
          
        >
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            {casa.titulo}
          </Text>

          <Box mb={8}>
            <Text fontSize="xl" mb={4}>
              {casa.descricao}
            </Text>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mb={6}>
              {/* Informações da casa */}
            </SimpleGrid>
          </Box>

          <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={8} maxW="100%" overflow="hidden">
            {casa.fotos.map((foto, index) => (
              <Image
                key={index}
                src={foto}
                alt={`Foto ${index + 1}`}
                borderRadius="lg"
                cursor="pointer"
                w="100%"
                h="auto"
                onClick={() => {
                  setCurrentImageIndex(index);
                  onOpen();
                }}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Container>


      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.9)" boxShadow="none" h="100vh">
          <ModalBody position="relative" p={0} display="flex" alignItems="center" justifyContent="center" h="100vh">
            <IconButton
              icon={<FaTimes />}
              position="absolute"
              right={4}
              top={4}
              onClick={onClose}
              bg="white"
              zIndex={2}
              size="lg"
            />
            <IconButton
              icon={<FaChevronLeft />}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={prevImage}
              bg="white"
              zIndex={2}
              size="lg"
            />
            <IconButton
              icon={<FaChevronRight />}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={nextImage}
              bg="white"
              zIndex={2}
              size="lg"
            />
            <Box p={2}>
              <Image
                src={casa.fotos[currentImageIndex]}
                alt={`Foto ${currentImageIndex + 1}`}
                w="95vw"
                h="95vh"
                objectFit="contain"
                objectPosition="center"
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  )
}

export default HouseDetail