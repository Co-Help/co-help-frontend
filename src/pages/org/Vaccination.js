import {HamburgerIcon} from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../components/Loader';
import {deleteVaccines, getVaccines} from '../../redux/actions/org/OrgAction';
import {AddVaccineModal} from './components/vaccine/AddVaccineModal';
import {VaccineCard} from './components/vaccine/VaccineCard';

export const Vaccination = () => {
  const dispatch = useDispatch();
  const vaccines = useSelector(state => state.orgVaccine.vaccines);
  const addVaccineSuccess = useSelector(
    state => state.orgVaccine.addVaccineSuccess
  );
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    dispatch(getVaccines());
  }, [dispatch, addVaccineSuccess]);

  if (!vaccines) return <Loader />;

  return (
    <Box pos='relative' minH='85vh'>
      <Box>
        <HStack justify='space-between'>
          <Heading size='sm'>Vaccine batches</Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Open menu'
              bg='transparent'
              icon={<HamburgerIcon />}
            />
            <MenuList>
              <MenuItem onClick={vaccines?.length ? onOpen : null}>
                Delete Vaccines
              </MenuItem>
              <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>Delete all vaccines?</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    Are you sure you want to delete all the vaccines?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      No
                    </Button>
                    <Button
                      colorScheme='red'
                      ml={3}
                      onClick={() => {
                        dispatch(deleteVaccines());
                        onClose();
                      }}>
                      Yes
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </MenuList>
          </Menu>
        </HStack>
        {vaccines?.length ? (
          <Stack spacing={2} mt={3}>
            {vaccines?.map(v => (
              <VaccineCard key={v._id} vaccine={v} />
            ))}
          </Stack>
        ) : (
          <Text textAlign='center' mt={30} fontSize='md'>
            No vaccines are available
          </Text>
        )}
      </Box>
      <AddVaccineModal />
    </Box>
  );
};
