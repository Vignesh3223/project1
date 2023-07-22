//Products Interface
export interface Products {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
}

//User Interface
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    useremail: string;
    password: string;
    confirmpassword: string;
    profession: string;
    city: string;
    state: string;
    pincode: number;
    logged: boolean;
}

//Cart Interface
export interface Cart {
    id: number;
    image: string;
    title: string;
    quantity: number;
    price: number;
    total: number;
    description: string;
}

//Task Interface
export interface Task {
    id: number;
    topic: string;
    content: string;
    duedate: Date;
    assignto: string;
    status: string;
}