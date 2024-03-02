import { Button } from "keep-react";
import { Trash, Pencil } from "phosphor-react";
import { useState } from "react";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import UserForm from "./UserForm";
import { User } from "../../../../types/User";

type UserRowProps = User;

const UserRow: React.FC<UserRowProps> = ({
  id,
  name,
  lastName,
  email,
  password,
  identification,
  cellphone,
  role,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const handleUpdateModal = () => setOpenUpdateModal(!openUpdateModal);
  return (
    <>
      <tr className="bg-white hover:bg-grayLight transition-all">
        <td className="row-table">{id}</td>
        <td className="row-table flex flex-col text-lg">
          {name} <span className="text-sm text-gray-600">{email}</span>
        </td>

        <td className="row-table">{cellphone}</td>
        <td className="row-table">{role}</td>

        <td className="row-table">
          <div className="flex gap-2">
            <Button
              size={28}
              color="warning"
              className="p-2"
              onClick={handleUpdateModal}
            >
              <Pencil />
            </Button>
            <Button
              size={28}
              color="error"
              className="p-2"
              onClick={handleDeleteModal}
            >
              <Trash />
            </Button>
          </div>
        </td>
      </tr>
      {openDeleteModal && (
        <Modal open={openDeleteModal} onClose={handleDeleteModal}>
          <DeleteModal
            handleDeleteModal={handleDeleteModal}
            id={id!}
            name={name}
          />
        </Modal>
      )}
      {openUpdateModal && (
        <Modal open={openUpdateModal} onClose={handleUpdateModal}>
          <UserForm
            mode="update"
            handleUpdateModal={handleUpdateModal}
            id={id!}
            name={name}
            lastName={lastName}
            email={email}
            password={password}
            cellphone={cellphone}
            identification={identification}
            role={role}
          />
        </Modal>
      )}
    </>
  );
};

export default UserRow;