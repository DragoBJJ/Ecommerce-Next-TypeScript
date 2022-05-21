import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { RegisterData } from "../../components/Form/FormAreaType";
import * as bcrypt from "bcrypt";
import { apolloAuthorizedClient } from "../../graphql/apolloClient";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  CreateAccountDocument,
  PublishAccountMutation,
  PublishAccountMutationVariables,
  PublishAccountDocument
} from "../../generated/graphql";

type ApiType = {
  userID?: string;
  message?: string;
};

const SignUpHandler: NextApiHandler<ApiType> = async (req, res) => {
  const {
    username,
    email,
    specialization,
    password,
    confirmPassword
  }: RegisterData = req.body;

  if (password !== confirmPassword) {
    return res.status(500).json({ message: "your passwords don't match" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const { data: createdUser } = await apolloAuthorizedClient.mutate<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >({
    mutation: CreateAccountDocument,
    variables: {
      data: {
        email,
        specialization,
        username,
        password: hashedPassword
      }
    }
  });
  if (!createdUser || !createdUser.createAccount)
    return res.status(400).json({ message: "Error with your creating User" });

  await apolloAuthorizedClient.mutate<
    PublishAccountMutation,
    PublishAccountMutationVariables
  >({
    mutation: PublishAccountDocument,
    variables: {
      id: createdUser.createAccount.id
    }
  });
  return res.status(200).json({ userID: createdUser.createAccount.id });
};

export default SignUpHandler;
