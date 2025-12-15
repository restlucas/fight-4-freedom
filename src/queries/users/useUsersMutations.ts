import { usersService } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "./users.queryKeys";
import { alertToast } from "@/src/lib/alert-toast";

export function useUsersMutations() {
  const queryClient = useQueryClient();

  const preRegisterUser = useMutation({
    mutationFn: usersService.preRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.listAll(),
      });

      alertToast.success("Jogador pré-cadastrado com sucesso!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const registerUser = useMutation({
    mutationFn: usersService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });

      alertToast.success(
        "Informações registradas com sucesso. Bem vindo ao F4F!",
        {
          duration: 3000,
        }
      );
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: usersService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });

      alertToast.success("Informações atualizadas com sucesso!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: usersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
        refetchType: "all",
      });

      alertToast.success("Jogador deletado com sucesso!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  return {
    preRegisterUser,
    registerUser,
    updateUser,
    deleteUser,
  };
}
