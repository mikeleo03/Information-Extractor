import React from "react";
import axios from "axios";

export default class ExtractionForm extends React.Component {
    state = {
        keyword: "",
        data: [],
        algorithm: "Regex",
    };

    changeHandler = (event) => {
        if (event.target.type === "radio") {
            this.setState({ algorithm: event.target.value })
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    submitHandler = async (event) => {
        event.preventDefault();

        const formInput = this.state;

        await axios
            .post("http://localhost:5000/api/search", formInput)
            .then((resp) => {
                console.log(resp);
            })
            .catch((e) => console.log(e));

        this.props.onPost();
    };

    handleFolderChosen = (files) => {
        let data = [];
        Array.from(files).forEach((file) => {
            console.log(file.name);
            let fileReader = new FileReader();
            fileReader.readAsText(file);

            fileReader.onloadend = (e) => {
                const content = fileReader.result;
                let filedata = {
                    filename: file.name,
                    content: content,
                };
                data.push(filedata);
            };
        });
        console.log(data);
        this.setState({ data: data });
    };

    // Handling file input
    handleFileChosen = (file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const content = fileReader.result;
            this.setState({ filename: file.name, content: content });
        };
        fileReader.readAsText(file);
    };

    render() {
        const { keyword, content } = this.state;

        return (
            <form className="w-full" onSubmit={this.submitHandler}>
                <div className="text-lg text-center w-full py-4">
                    Please input the keywords and file to be searched!
                </div>
                <div className="flex py-1 mb-2">
                    <div className="w-1/3 my-auto">
                        <label className="block font-bold text-md">Keyword</label>
                    </div>
                    <div className="w-2/3">
                        <input
                            type="text"
                            className="w-full rounded-lg p-2 text-sm bg-gray-900 text-white"
                            placeholder="Input keyword here"
                            name="keyword"
                            value={keyword}
                            onChange={this.changeHandler}
                        />
                    </div>
                </div>
                <div className="py-1">
                    <label class="block mb-2 text-md font-bold text-gray-900 dark:text-white" for="dropzone-file">Insert file</label>
                    <input class="block w-full mb-3 text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-900 focus:outline-none py-1" id="dropzone-file" directory="" webkitdirectory="" type="file" onChange={(e) => this.handleFolderChosen(e.target.files) && console.log(content)}></input>
                </div>
                <div className="py-1">
                    <h4 className="font-bold">Select the algorithms</h4>
                    <div className="flex flex-col mt-1.5 grid grid-cols-3 space-x-2 rounded-lg bg-gray-800 p-1.5" x-data="app">
                        <div>
                            <input type="radio" id="patternbm" name="algorithm" value="BM" checked={this.state.algorithm === "BM"} onChange={this.changeHandler} class="peer hidden"></input>
                            <label for="patternbm" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#2a3786] peer-checked:font-bold peer-checked:text-white h-full flex justify-center items-center">Boyers-Moore</label>
                        </div>
                        <div>
                            <input type="radio" id="patternkmp" name="algorithm" value="KMP" checked={this.state.algorithm === "KMP"} onChange={this.changeHandler} class="peer hidden"></input>
                            <label for="patternkmp" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#2a3786] peer-checked:font-bold peer-checked:text-white h-full flex justify-center items-center">Knuth-Morris-Pratt</label>
                        </div>
                        <div>
                            <input type="radio" id="regex" name="algorithm" value="Regex" checked={this.state.algorithm === "Regex"} onChange={this.changeHandler} class="peer hidden"></input>
                            <label for="regex" className="text-sm block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#2a3786] peer-checked:font-bold peer-checked:text-white h-full flex justify-center items-center">Regular Expression</label>
                        </div>
                    </div>
                </div>
                <div className="flex py-4">
                    <button
                        className="w-full bg-[#d03081] p-2 text-white rounded hover:shadow-md hover:bg-[#841c5c]"
                        type="submit"
                    >
                        Go!
                    </button>
                </div>
            </form>
        );
    }
}