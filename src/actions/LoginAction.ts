import { ActionFunctionArgs, redirect } from "react-router-dom";
import SecurityService from "../services/SecurityService";
import { toast } from "react-toastify";

export const actionLogin = async({request}: ActionFunctionArgs) => {
    console.log('action login');
    
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    
    const security = SecurityService.getInstance();
    const isConnected = await security.connect(email, password);
    //const isConnected = true;
    if (isConnected) {
        console.log('connecté');
        //security.notifyListeners();
        //const users = await JsonUserService.getInstance().loadByUsername(username) as IUser[];
        
        //toast.success('Connexion réussie');
        toast.success('Connexion acceptée');
        return redirect("/Home");
    } else {
        toast.error('Connexion refusée');
        console.log('non connecté');
        return redirect("/LogIn");
    }
}