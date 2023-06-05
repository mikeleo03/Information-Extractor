import React, { Component } from "react";
import axios from "axios";
// import { ReactComponent as SearchImage } from "./assets/search.svg";
import backgroundImage from "./assets/background/main-bg-2.avif"
import ExtractionForm from "./components/ExtractionForm";
import ResultCard from "./components/ResultCard";

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
            <div style={backgroundStyle} className="bg-gray-900 min-h-screen">
                <nav className="flex p-4 shadow-lg sticky top-0 z-40 backdrop-blur-lg">
                    <div className="flex w-full items-center justify-between text-white
        ">
                        <div className="text-xl font-bold text-white md:pl-6 pl-4">
                            Kepoin Yuk!
                        </div>
                        <div
                            className="md:text-xl font-bold border-2 border-white text-white hover:bg-white hover:text-purple-600 p-1 px-5 rounded-3xl mr-4"
                            onClick={() =>
                                this.setState({ toggleAbout: !this.state.toggleAbout })
                            }
                        >
                            {this.state.toggleAbout ? "Main" : "About"}
                        </div>
                    </div>
                </nav>
                <div className="mx-auto my-auto md:px-14 px-10 p-6 z-30 justify-center self-auto items-center content-center">
                    <div className="flex flex-col md:flex-row w-full mb-0 md:p-6 text-white">
                        {!this.state.toggleAbout ? (
                            <div className="flex flex-col md:p-6 p-0 items-center justify-center md:w-1/2 w-full">
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
                            <div className="flex flex-col md:p-6 p-0 items-center justify-center md:w-1/2 w-full">
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
                        <div className="flex flex-col md:p-5 p-0 items-center justify-center md:w-1/2 w-full">
                            <ExtractionForm onPost={this.setHasPosted.bind(this)} />
                        </div>
                    </div>
                    <div>{this.state.hasFinishedLoading ? this.result : null}</div>
                </div>
            </div>
        );
    }
}