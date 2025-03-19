import { useRecoilState } from "recoil";
import { ITodoList, todoListAtom } from "../atom";
import { useForm } from "react-hook-form";

interface IForm {
  data: string;
}

export default function AddBoard() {
  const [, setTodoList] = useRecoilState(todoListAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ data }: IForm) => {
    setTodoList((prev: ITodoList) => ({ ...prev, [data]: [] }));
    setValue("data", "");
  };
  return (
    <div className="flex">
      <div>AddBoard</div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("data", { required: true })} className="bg-white" />
      </form>
    </div>
  );
}
