import React from "react";
import axios from "axios";

export default class ExtractionForm extends React.Component {
    state = {
        keyword: "",
        data: [],
        algorithm: "",
    };

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
                    Please input the keywords and file to be searched.
                </div>
                <div className="flex py-1">
                    <div className="w-1/3 my-auto">
                        <label className="block font-bold text-md">Keyword</label>
                    </div>
                    <div className="w-2/3">
                        <input
                            type="text"
                            className="w-full border-gray-400 border rounded-md p-2 text-sm text-gray-900"
                            placeholder="Input keyword here"
                            name="keyword"
                            value={keyword}
                            onChange={this.changeHandler}
                        />
                    </div>
                </div>
                <div className="flex py-2">
                    <input
                        directory=""
                        webkitdirectory=""
                        type="file"
                        onChange={(e) => this.handleFolderChosen(e.target.files) && console.log(content)}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <h4 className="font-bold pb-1.5">Select the algorithms</h4>
                    <div className="px-4">
                        <input type="radio" id="patternbm" name="matchmethod" value="Booyer-Moore" checked={this.state.algorithm = "BM"}></input>
                        <label for="patternbm" className="px-3 py-2">Boyers-Moore</label>
                    </div>
                    <div className="px-4">
                        <input type="radio" id="patternkmp" name="matchmethod" value="Knuth-Morris-Pratt" checked={this.state.algorithm = "KMP"}></input>
                        <label for="patternbm" className="px-3 py-2">Knuth-Morris-Pratt</label>
                    </div>
                    <div className="px-4">
                        <input type="radio" id="regex" name="matchmethod" value="Regular Expression" checked={this.state.algorithm = "Regex"}></input>
                        <label for="patternbm" className="px-3 py-2">Regular Expression (default)</label>
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