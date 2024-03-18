import { Pencil } from "phosphor-react";
import InputField from "@/components/Input/InputField";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Reservation,
  ReservationForm,
  reservationSchema,
} from "@/types/Reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";

import {
  createReservationAction,
  getReservationsAction,
} from "@/store/reservations";

type BookFormProps = {
  handleModal: () => void;
  mode: string;
} & Partial<ReservationForm>;

const BookForm = ({
  handleModal,
  mode,
  id,
  name,
  email,
  phoneNumber,
  reservationDate,
  description,
  numberOfPeople,
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationForm>({
    defaultValues: {
      id,
      name,
      phoneNumber, // Agregado
      email, // Agregado
      reservationDate, // Agregado
      description,
      numberOfPeople,
    },
    resolver: zodResolver(reservationSchema),
  });

  const text = mode === "update" ? "Update" : "Create";

  // const reservations = useSelector((state: RootState) => state.reservations);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<ReservationForm> = useCallback(
    async (data) => {
      try {
        console.log("Data received by onSubmit:", data); // Agregado

        data.id = data.id === "" || data.id === null ? null : data.id;
        const reservation: Reservation = {
          id: data.id,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          description: data.description,
          reservationDate: data.reservationDate,
          numberOfPeople: data.numberOfPeople,
        };

        console.log("Reservation object to be dispatched:", reservation); // Agregado

        if (mode === "update" && reservation.id !== null) {
          // todo
        } else {
          const result = await dispatch(createReservationAction(reservation));
          console.log(
            "Result from dispatching createReservationAction:",
            result
          ); // Agregado
        }
        dispatch(getReservationsAction());

        handleModal();
      } catch (error) {
        console.error("Error in onSubmit:", error); // Agregado
        throw new Error("Error creating or updating menu");
      }
    },
    [dispatch, handleModal, mode]
  );

  const renderErrorMessage = (error: { message?: string }) => {
    return error && <p className="p-1 text-red-700">{error.message}</p>;
  };

  return (
    <div className="mx-auto my-4 w-48 sm:w-56 md:w-72 text-center">
      <div className="flex justify-center items-center mb-8">
        <Pencil size={52} color="orange" />
      </div>
      <h3 className="text-lg font-black text-gray-800">{text}</h3>
      <div className="text-left text-sm text-gray-500">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField {...register("id")} type="hidden" />
          {renderErrorMessage(errors.id!)}
          <InputField {...register("name")} />
          {renderErrorMessage(errors.name!)}
          <InputField {...register("phoneNumber")} />
          {renderErrorMessage(errors.phoneNumber!)}
          <InputField {...register("email")} />
          {renderErrorMessage(errors.email!)}
          <InputField {...register("reservationDate")} type="datetime-local" />
          {renderErrorMessage(errors.reservationDate!)}
          <InputField {...register("description")} />
          {renderErrorMessage(errors.description!)}
          <InputField {...register("numberOfPeople")} type="number" />
          {renderErrorMessage(errors.numberOfPeople!)}
          <div className="flex gap-4 mt-8">
            <button
              className={`${
                mode === "update" ? "btn btn-warning" : "btn btn-success"
              } w-full`}
              type="submit"
            >
              {text}
            </button>
            <button className="btn btn-light w-full" onClick={handleModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
