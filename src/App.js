import React, { Component } from "react";
import axios from "axios";
import backgroundImage from "./assets/background/main-bg-2.avif"
import ExtractionForm from "./components/ExtractionForm";
import ResultCard from "./components/ResultCard";
import search from "./assets/search.png";

const url = process.env.REACT_APP_BACKEND_URL;

const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "auto",
}

export default class App extends Component {
    constructor() {
        super();
        this.result = [];
        this.state = {
            hasPosted: false,
            hasFinishedLoading: false,
            toggleAbout: false,
        };
    }

    componentDidMount() {
        axios.get(url + "/api/keyword").then(
            (e) => {
                console.log(e);
            },
            (e) => {
                console.log(e);
            }
        );
    }

    generateResult = async () => {
        const result = await axios
            .get(url + "/api/extract_information")
            .then((response) => {
                const results = [];
                console.log(response);
                for (let i = 0; i < response.data.result.data.length; i++) {
                    results.push(
                        <ResultCard
                            key={i}
                            filename={response.data.result.data[i].filename}
                            highlightedContent={
                                response.data.result.data[i].highlightedContent
                            }
                            keyword={response.data.result.keyword}
                            algorithm={response.data.result.algorithm}
                        />
                    );
                }
                console.log(results);
                this.result = results;
            })
            .finally(() => {
                this.setState({ hasFinishedLoading: true });
            });
        console.log(result);
    };

    setHasPosted() {
        this.setState({
            hasPosted: true,
        });
        this.generateResult();
    }

    render() {
        return (
            <div style={backgroundStyle} className="bg-gray-900 min-h-screen">
                <nav className="flex p-4 shadow-lg sticky top-0 z-40 backdrop-blur-lg">
                    <div className="flex w-full items-center justify-between text-white">
                        <a href="/">
                            <div className="md:text-xl text-lg font-bold text-white md:pl-6 pl-4">
                                Kepoin Yuk!
                            </div>
                        </a>
                        <div className="flex">
                            <a href="https://github.com/mikeleo03/Information-extractor" target="_blank" rel="noopener noreferrer">
                                <div className="md:text-xl font-bold text-white hover:bg-white hover:text-[#2a3786] p-1.5 md:px-5 px-3 rounded-3xl md:mr-4 mr-2">
                                    Explore
                                </div>
                            </a>
                            <div
                                className="md:text-xl font-bold border-2 border-white text-white hover:bg-white hover:text-[#2a3786] p-1 md:px-5 px-3 rounded-3xl mr-4"
                                onClick={() =>
                                    this.setState({ toggleAbout: !this.state.toggleAbout })
                                }
                            >
                                {this.state.toggleAbout ? "Main" : "About"}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="mx-auto my-auto md:px-14 px-8 p-6 z-30 justify-center items-center flex flex-col">
                    <div className="flex flex-col md:flex-row w-full mb-0 md:p-6 text-white">
                        <div className="flex flex-col md:p-6 p-0 items-center justify-center md:w-1/2 w-full">
                            <div className="p-0">
                                <img src={search} alt="" class="w-auto h-60"></img>
                            </div>
                            <div className="font-semibold text-5xl text-center w-full leading-tight my-2">
                                Kepoin Yuk!
                            </div>
                            <div className="text-md text-center w-full">
                                - Simple information extractor -
                            </div>
                        </div>
                        <div className="flex flex-col md:p-5 p-0 items-center justify-center md:w-1/2 w-full">
                            <ExtractionForm onPost={this.setHasPosted.bind(this)} />
                        </div>
                    </div>
                    <div className="w-full">{this.state.hasFinishedLoading ? this.result : null}</div>
                </div>
            </div>
        );
    }
}