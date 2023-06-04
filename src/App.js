import React, { Component } from "react";
import axios from "axios";
// import { ReactComponent as SearchImage } from "./assets/search.svg";
import ExtractionForm from "./components/ExtractionForm";
import ResultCard from "./components/ResultCard";

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
        axios.get("http://localhost:5000/api/keyword").then(
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
            .get("http://localhost:5000/api/extract_information")
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
                            date={response.data.result.data[i].date}
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
            <div className="bg-gray-900 min-h-screen">
                <nav className="flex p-4 shadow-lg sticky top-0 bg-white">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-xl font-bold text-purple-600 pl-6">
                            Information Extractor
                        </div>
                        <div
                            className="text-xl font-bold text-purple-600 hover:bg-purple-600 hover:text-white p-2 px-4 rounded-md mr-4"
                            onClick={() =>
                                this.setState({ toggleAbout: !this.state.toggleAbout })
                            }
                        >
                            {this.state.toggleAbout ? "Main" : "About"}
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto mt-0 mb-4 p-6">
                    <div className="flex flex-col md:flex-row w-full mt-0 mb-4 p-6 rounded-2xl
               text-[#1A2421]
               backdrop-blur-lg
               [ p-8 md:p-10 lg:p-10 ]
               [ bg-gradient-to-b from-white/60 to-white/30 ]
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl">
                        {!this.state.toggleAbout ? (
                            <div className="flex flex-col md:p-6 p-4 items-center justify-center md:w-1/2 w-full">
                                <div className="pt-0 p-4">
                                    <img width="200" height="200" src="https://www.poolparty.biz/wp-content/uploads/2015/08/pp_icons_textanalyse.svg" alt="" class="et-waypoint et_pb_animation_top et_pb_animation_top_tablet et_pb_animation_top_phone wp-image-7967 entered lazyloaded et-animated"></img>
                                </div>
                                <div className="font-semibold md:text-5xl text-4xl text-center w-full leading-tight my-2">
                                    Kepoin Yuk!
                                </div>
                                <div className="text-md text-center w-full">
                                    Simple information extractor
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:p-6 p-4 items-center justify-center md:w-1/2 w-full">
                                <div className="p-4 w-1/2 h-1/2">
                                </div>
                                <div className="font-semibold text-4xl text-center w-full leading-tight my-2">
                                    -
                                </div>
                                <div className="font-medium text-xl text-center w-full leading-tight my-2">
                                    -
                                </div>
                                <div className="text-md text-center w-full">
                                    -
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col md:p-5 p-3 items-center justify-center md:w-1/2 w-full">
                            <ExtractionForm onPost={this.setHasPosted.bind(this)} />
                        </div>
                    </div>
                    <div>{this.state.hasFinishedLoading ? this.result : null}</div>
                </div>
            </div>
        );
    }
}