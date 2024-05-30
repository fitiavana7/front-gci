export interface ILogin {
    email : string ,
    password : string
}

export interface IProject{
    id? : number,
    nom : string ,
    description :string,
    lieu : string,
    user? : IUser
}

export interface IRegister {
    email : string , 
    password : string ,
    username : string ,
    lieu : string , 
    annee : string , 
    devise : string
}


export interface IUser {
    id : number ,
    email : string , 
    password : string ,
    username : string ,
    lieu : string , 
    annee : string , 
    devise : string
}

export interface SelectDataType {
    type : string ,
    abr : string
}

export interface IGroup{
    id? : number,
    nom : string ,
    description : string,
    total? : number ,
    projet? : IProject,
    items? : IItem[]
}

export interface LoginResponse{
    logged : boolean
}

export interface StatType{
    nom : string ,
    value :string
}
export interface IItem{
    id? : number ,
    libelle : string , 
    quantite : number ,
    mesure : string, 
    prix_un : number ,
    prix? : number ,
    payment : string ,
    date : string,
    groupe? : IGroup
}