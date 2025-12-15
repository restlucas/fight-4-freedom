import { usersService } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { medalsKeys } from "./medals.queryKeys";
import { alertToast } from "@/src/lib/alert-toast";
import { medalsService } from "@/src/services/medal.service";

export function useMedalsMutations() {
  const queryClient = useQueryClient();

  const createMedal = useMutation({
    mutationFn: medalsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: medalsKeys.listAll(),
      });

      alertToast.success("Medalha criada com sucesso!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const updateMedal = useMutation({
    mutationFn: medalsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: medalsKeys.lists(),
      });

      alertToast.success("Medalha atualizada com sucesso!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      alertToast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const deleteMedal = useMutation({
    mutationFn: medalsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: medalsKeys.lists(),
        refetchType: "all",
      });

      alertToast.success("Medalha deletada com sucesso!", {
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
    createMedal,
    updateMedal,
    deleteMedal,
  };
}
