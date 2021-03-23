
import {CognitoUserPool} from "amazon-cognito-identity-js"
const poolData = {
	UserPoolId: 'us-west-2_yubgvifWc', 
	ClientId: "22t7u1q0sl3gmav291t0sl110e" 
};
export const UserPool = new CognitoUserPool(poolData);