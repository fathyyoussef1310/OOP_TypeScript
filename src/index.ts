class User {
    constructor(public id: number, public name: string, public email: string, protected password: string, private phone: string, public age: number,
                public noteBooks: NoteBook [] = []
    ) {
        if (age < 18 || age > 60) {
            throw new Error(`User age must be at least above 18 and Less than 61`);
        }
    }

    displayInfo(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            age: this.age,
        };
    }

    addNoteBook(noteBook: NoteBook): void {
        this.noteBooks.push(noteBook);
    }

     removeNoteBook(name: string): void {
        this.noteBooks = this.noteBooks.filter(
            noteBook => noteBook.name !== name
        );
    };
}
class Admin extends  User{
    constructor(id:number , name:string , email:string ,password:string, phone:string , age:number) {
        super(id, name, email , password , phone , age);
    }
    displayInfo(): object {
        return [
            `The Admin id is ${this.id}`,
            `The Admin name is ${this.name}`,
            `The Admin email is ${this.email}`,
            `The Admin age is ${this.age}`,
            `The Admin Notes are ${this.noteBooks.map(noteBook => noteBook.name).join(", ")}`
        ]
    }
    adminManages(noteBooks:NoteBook):void{
        noteBooks.notes.forEach(noteBook => {
            console.log(noteBook.preview())
        })
    }
}

class Note{
    constructor(public  id:number , public title:string , public content:string, protected userId:User) {}
    preview():string{
        return this.content.substring(0,20);
    }
    author():string{
        return  this.userId.name
    }
}
////Composition :: Answer of Q Has-A
class NoteBook {
    constructor(public name: string, public notes: Note[] = []) {}
    addNote(note: Note): void {
        this.notes.push(note);
    }

    removeNote(id: number): void {
        this.notes = this.notes.filter(note => note.id !== id);
    }
}
let noteBook1 = new NoteBook("OOP");
let noteBook2 = new NoteBook("DSS");

let admin1 = new Admin(1, "Ahmed", "fathy@gmail", "passs", "0111", 20);
 let note1 = new Note(3,"Ilija Dragnov" , "Russian Dragon Just Signs a Contract with AEW" ,admin1)
admin1.addNoteBook(noteBook1);
admin1.addNoteBook(noteBook2);

console.log(note1.preview())

console.log(admin1.noteBooks);




// Q 2 2
//
// Relationship	=  Classes 	           Meaning
// Inheritance	   Admin  User	       Admin IS-A User So Can extend every thing from User
// Composition	  NoteBook = Note	   NoteBook owns Notes  ((NoteBooks Must Have  Notes))
// Aggregation	User = NoteBook	       User has NoteBooks that can exist independently

