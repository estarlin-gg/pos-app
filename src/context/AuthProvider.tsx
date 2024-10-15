/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext, IUser } from "../models";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, storage } from "../firebase/firebase";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { errorMessages } from "../utils/errorMessages";

interface AuthProviderProps {
  children: ReactNode;
}

const Context = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [credentials, setCredentials] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setCredentials(currentUser);
      setLoading(false);
    });
  }, []);

  const Register = async (user: IUser) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const userUID = userCredential.user?.uid;
      if (userUID) {
        await CreateFolder(userUID);
      }
    } catch (error: any) {
      console.error("Registration error:", error.code);
      const message =
        errorMessages[error.code] ||
        "An error occurred during registration. Please try again.";
      setFirebaseError(message);
    } finally {
      setLoading(false);
    }
  };

  const Login = async (user: IUser) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        errorMessages[error.code] ||
        "An error occurred while logging in. Please try again.";
      setFirebaseError(message);
    } finally {
      setLoading(false);
    }
  };

  const LogOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  const CreateFolder = async (uid: string | undefined) => {
    try {
      const folderRef = ref(storage, `${uid}/`);
      const dummyFile = new Blob(["dummy content"], { type: "text/plain" });
      await uploadBytes(ref(folderRef, "placeholder.txt"), dummyFile);
      console.log("Folder successfully created in Firebase Storage");
    } catch (error) {
      console.error("Error creating folder in storage:", error);
    }
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        Register,
        Login,
        LogOut,
        credentials,
        firebaseError,
      }}
    >
      {loading ? <Loading /> : children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Context);
