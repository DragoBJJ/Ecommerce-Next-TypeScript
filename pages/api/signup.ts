import { NextApiHandler } from "next";
import { RegisterData } from "../../components/Form/FormAreaType";
import * as bcrypt from "bcrypt";
import {
  apolloClient,
  apolloAuthorizedClient
} from "../../graphql/apolloClient";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  CreateAccountDocument
} from "../../generated/graphql";

const SignUpHandler: NextApiHandler = async (req, res) => {
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

  const { data } = await apolloAuthorizedClient.mutate<
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
  res.status(200).json({ useID: data?.createAccount?.id });
};

export default SignUpHandler;
