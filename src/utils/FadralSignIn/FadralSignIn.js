import { Auth } from "aws-amplify";

export const FederatedsignUp = async (providertype) => {
 await Auth.federatedSignIn({ provider: providertype });
};
