<script>
    // importing required packages from firebase
    import { initializeApp, getApps, getApp } from "firebase/app";
    import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
    // configurations for connecting to firebase 9 and ensuring database is synced correctly
    import { firebaseConfig } from "$lib/firebaseConfig";
    import { browser } from "$app/environment";

    // initializing the firebaseApp base don whether or not getApps length is 0
    // if so, then initialize based on firebaseConfig, if not, then just get the app
    const firebaseApp = 
        browser &&
        (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
        
    // initialize cloud firestore, get reference to service
    const db = browser && getFirestore(firebaseApp);
    const colRef = browser && collection(db, "todos");

    // initialize the list of todos
    let todos = [];

    // adding the list of todos from the database to the list of local todos
    const unsubscribe = 
        browser && 
        onSnapshot(colRef, (querySnapshot) => {
            let fbTodos =[];
            querySnapshot.forEach((doc) => {
                let todo = { ...doc.data(), id: doc.id };
                fbTodos = [todo, ...fbTodos];
            });
            todos = fbTodos;
        });

    // initializing the task and error message variables
    let task = "";
    let error = "";

    // action to add the todo to the list, called when the user clicks enter or the button
    const addTodo = async () => {
        // check that the task variable has been assigned a value and isn't empty
        if (task !== "") {
            // initialize the todos to the format used in the display
            const docRef = await addDoc(collection(db,"todos"), {
                // task is the task text
                task: task,
                // start with the task not checked off
                isComplete: false,
                // assign a date to the task for the backend
                createdAt: new Date(),
            });
            // ensure the error message is wiped
            error ="";
        // show the error message if there is nothing written in the task box
        } else {
            error = "Task is empty";
        }
        // clear the task variable after we have added it
        task = "";
    };

    // function called when the check button is pressed
    const markTodoAsComplete = async (item) => {
        // old code that doesn't integrate firebase
        // todos[index].isComplete = !todos[index].isComplete;

        // finding the correct todo based on the item id, and changing the boolean of isComplete
        await updateDoc(doc(db, "todos", item.id), {
            isComplete: !item.isComplete,
        });
    };

    // function to delete the todo item using the id of the item to be deleted
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

    // execute the addTodo function every time that the enter key is pressed
    const keyIsPressed = (event) => {
        if(event.key === "Enter") {
            addTodo();
        }
    }

    // testing code
    // $: console.table(todos);

</script>


<h1>RunLin's Svelte + Firebase To Do List!</h1>

<div class="content">

<!-- text input box here -->
<input type="text" placeholder="Add a task" bind:value={task} />
<!-- button that calls addTodo function -->
<button on:click={addTodo}>Add</button>

<ol>
    <!-- integrating code here to add each of the todos as a list item -->
    {#each todos as item}
        <!-- changing the formatting of the list item based on whether it is marked as complete -->
        <li class:complete={item.isComplete}>
            <!-- actual text of the task -->
            <span>{item.task}</span>
            <span>
                <!-- check button marks it as complete / incomplete, x button deletes it from list -->
                <button on:click={() => markTodoAsComplete(item)}>✓</button>
                <button on:click={() => deleteTodo(item.id)}>✖</button>
            </span>
        </li>
    {:else}
        <p>No todos found.</p>
    {/each}
    <!-- show error message when there is nothing in the input box -->
    <p class="error">{error}</p>
</ol>
</div>

<!-- making sure that when a keyIsPressed the page responds with the correct script -->
<svelte:window on:keydown={keyIsPressed}></svelte:window>

<style>
    /* center align title text */
    h1 {
        text-align: center;
    }
    /* center the full content div */
    .content {
        max-width: 500px;
        margin: auto;
    }
    /* strike through style to indicate completion of a task */
    .complete {
        text-decoration: line-through;
    }
    /* display error message text in red */
    .error {
        color: red;
    }
</style>