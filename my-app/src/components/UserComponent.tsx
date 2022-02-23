import { User } from '../models/User.model';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { difficultTimer } from '../index';
import { Route, Routes } from 'react-router-dom';
import MeComponent from './MeComponent';

type UserProps = {
  user: User| null 
};

const UserComponent: React.FC<UserProps> = (props: UserProps) => {
    useEffect(() =>  {
      // DidMount
      console.log("User component is ready");
      return () => {
        console.log("User component is destroyed");
      }
    }, [])

    const result: JSX.Element = props.user !== null 
      ? (<div>User: {props.user.data.first_name} </div>)
      : (<div>No Content</div>)

    return (
        <div className="user-info">
          {result}
          {difficultTimer.secondsPassed}
        </div>
    );
  }

export default UserComponent