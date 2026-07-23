import { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <p>
        Name: {user.name}, Age: {user.age}
      </p>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
};

export default UserProfile;
