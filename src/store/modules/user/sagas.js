import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, project, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email, project, avatar_id },
      rest.oldPassoword ? rest : {}
    );

    const response = yield call(api.put, "users", profile);

    toast.success("perfil atualizado com sucesso");

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error("Erro ao atualizar perfil");
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
