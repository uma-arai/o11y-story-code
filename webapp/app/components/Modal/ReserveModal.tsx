import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { sleep } from "../../utils"
import { useState } from "react"

type Props = ReturnType<typeof useDisclosure> & { name?: string }

export const ReserveModal = ({ isOpen, onClose, name }: Props) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>見学予約をしてください</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {!!name && (
            <FormControl mb={4}>
              <FormLabel>お目当て</FormLabel>
              <Input disabled value={name} />
            </FormControl>
          )}
          <FormControl mb={4}>
            <FormLabel>名前</FormLabel>
            <Input placeholder="山田 太郎" />
          </FormControl>

          <FormControl>
            <FormLabel>電話番号</FormLabel>
            <Input placeholder="0312345678" />
          </FormControl>
        </ModalBody>

        <ModalFooter w={"100%"}>
          <Button
            isLoading={loading}
            mr={3}
            onClick={async () => {
              setLoading(true)
              await sleep(2000)
              setLoading(false)
              onClose()
              toast({
                title: "見学予約のリクエストをしました",
                description: "お返事をお待ちください！",
                status: "info",
                duration: 3000,
                isClosable: true,
              })
            }}
          >
            予約リクエスト
          </Button>
          <Button variant="secondary" onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
