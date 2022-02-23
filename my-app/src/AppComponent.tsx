import { useEffect, useState } from 'react';
import './App.css';
import { User } from './models/User.model';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from './Redux/counterSlice';
import { Button } from 'react-bootstrap';
import UserComponent from './components/UserComponent';
import React from 'react';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import MeComponent from './components/MeComponent';
import ErrorComponent from './components/ErrorComponent';
import { debug } from 'console';
import { makeAutoObservable } from 'mobx';
import { observer } from "mobx-react"

import { difficultTimer } from './index';
import { Data } from './models/Data.model';

const loadUser = async <T, >(url: string): Promise<T> => {
  const response: Response = await fetch(url);
  const user: any = await response.json();

  return user as T;
}

const sendPostRequest = async () => {

  const result = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "morpheus 123",
      job: "leader 123"
    })
  });
  
  console.log("Result body");
  console.log(await result.json());
}


function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AppComponent = observer(() => {
  const navigate = useNavigate();
  
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  console.log("Count", count);
  const [user1, setUser1] = useState<User | null>(null);
  const [user2, setUser2] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);


  const [flag, setFlag] = useState<boolean>(false);
  const [isAbout, setIsAbout] = useState<boolean>(false);
  
  useEffect(() =>  {
    // DidMount
     const initialize = async () => {
     const loadedUser1 = await loadUser<User>("https://reqres.in/api/users/2");
     await sendPostRequest();
     setUser1(loadedUser1);
    }
    initialize();
    return () => {
      // DidUnmount
    }
  }, [])

  useEffect(() =>  {
    console.log("User1 changed");
  }, [user1])

  useEffect(() =>  {
    console.log("User2 changed");
  }, [user2])

  const handlerButton = () => {
    const user =  new User();
    user.data.first_name = 'vlad';
    setUser1(user);
    console.log("Clicked");
  }

  const handleFlag = () => {
    setFlag(currentFlag => !currentFlag)
  }

  const handleMobx = () => {
    difficultTimer.increase();
  }

  const handleAddData = () => {
    const data = new Data();
    data.email = "vlad.vlad@google.com";
    data.id = getRandomInt(0, 10000000);
    data.first_name = "Vlad";
    data.avatar = "adkasd;kl";
    data.last_name = "VVVV"

    difficultTimer.addData(data);
  }

  const handleAdd = (data: Data) => {
    difficultTimer.addToBasket(data);
  }

  const handleRemove = (data: Data) => {
    difficultTimer.removeFromBasket(data.id);
  } 

  const handlerNavigate = () => {
    localStorage.setItem("key_basket", JSON.stringify([1, 2, 3]));
    const str_basket = localStorage.getItem("key_basket");
    if (str_basket != null) {
      const array = JSON.parse(str_basket) as number[];
    }
    console.log();
    if (isAbout) {
      navigate('/');
      setIsAbout(false);
      return;
    }
    navigate('about');
    setIsAbout(true);
  }
  
  const resultUserComponent = flag ? <UserComponent user={user1}></UserComponent> : <></>

  return (
      <>
        <div className="App">
          
          {resultUserComponent}
          {users.map(user => <UserComponent user={user}>
            <div>- test -</div>
          </UserComponent>)}

          <Button className='my-btn' onClick={() => handleFlag()}> Avtorize </Button>
          <Button className='my-btn' onClick={() => handlerNavigate()}> Navigate </Button>
          

        </div>

        {difficultTimer.secondsPassed}

        {difficultTimer.dataArray.map(x => 
          (<>
            <div className='css-data'>{x.id} {x.email}</div>
            <Button className='my-btn' onClick={() => handleMobx()}> Add to Basket </Button>
          </>))}

        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="*" element={<Navigate replace to={'/'} />} />
          <Route path="about/*" element={<AboutComponent />}/>
        </Routes>
      </>
  );
});

export default AppComponent;
