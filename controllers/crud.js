let users = [];

export const createuser = (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    const newuser = {
        id: Date.now(),
        name,
        email,
        password
    };
    users.push(newuser);
    res.status(201).json(newuser);
};

export const getallusers = (req, res) => {
    res.status(200).json(users);
};

export const getuserbyid = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
};

export const updateuser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = users.find(user => user.id === Number(id));
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    res.status(200).json(user);
};

export const deleteuser = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    users = users.filter(user => user.id !== Number(id));
    res.status(200).json(user);
};