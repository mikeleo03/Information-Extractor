import React from "react";

const SentenceComponent = (props) => {
    return <div dangerouslySetInnerHTML={{ __html: props.sentence }}></div>;
};

export default class ResultCard extends React.Component {
    render() {
        const children = [];
        let number = 1;

        for (let i = 0; i < this.props.highlightedContent.length; i++) {
            if (this.props.highlightedContent[i][0] !== "") {
                children.push(
                    <div className="flex flex-row items-center my-4" key={i} name={i}>
                        <div className="flex items-center justify-center mx-2">
                            <div className="flex items-center justify-center md:text-xl text-lg text-white bg-[#841c5c] md:h-12 md:w-12 w-10 h-10 font-bold rounded-full shadow-md hover:shadow-lg">
                                {number}
                            </div>
                        </div>
                        <div className="w-full mx-2">
                            <div className="flex flex-row">
                                <div className="md:mr-1.5 font-semibold md:basis-auto basis-1/3">Date :</div>
                                <div className="md:basis-auto basis-2/3">{this.props.highlightedContent[i][2]}</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="md:mr-1.5 font-semibold md:basis-auto basis-1/3">Count :</div>
                                <div className="md:basis-auto basis-2/3">{this.props.highlightedContent[i][1]}</div>
                            </div>
                            <div className="my-2">
                            <SentenceComponent
                                sentence={this.props.highlightedContent[i][0]}
                            />
                            </div>
                        </div>
                    </div>
                );
                number++;
            }
        }

        if (number === 1) {
            children.push(
                <div>Result not found.</div>
            );
        }

        let algo = '';
        if (this.props.algorithm === "KMP") {
            algo = "Knuth-Morris-Pratt"
        } else if (this.props.algorithm === "BM") {
            algo = "Boyers-Moore"
        } else if (this.props.algorithm === "Regex") {
            algo = "Regular Expression"
        }

        return (
        <div className="flex flex-col md:flex-row my-6 w-full rounded-lg
        text-white
        backdrop-blur-lg
        [ bg-gradient-to-b from-white/30 to-white/20 ]
        [ border-[1px] border-solid border-white border-opacity-30 ]
        [ shadow-black/70 shadow-2xl">
            <div className="flex flex-col md:p-6 p-3.5 items-center justify-center text-white bg-[#aa2071] md:rounded-l-lg rounded-lg">
                <div className="mx-1 md:text-2xl text-xl font-semibold">Filename</div>
                <div className="mx-2 text-base">{this.props.filename}</div>
            </div>
            <div className="flex flex-col md:p-6 p-4">
                <div className="flex items-center flex-row md:my-2 my-1">
                    <div className="mx-1 md-text-xl text-lg font-semibold">Algorithm : </div>
                    <div className="mx-2 text-lg">{algo}</div>
                </div>
                <div className="flex items-center flex-row md:my-2 my-1">
                    <div className="mx-1 md-text-xl text-lg font-semibold">Keyword : </div>
                    <div className="mx-2 text-lg">{this.props.keyword}</div>
                </div>
                <div className="p-1 pt-0">
                    <div className="md:my-2 my-1 mb-0 md-text-xl text-lg font-semibold">Result :</div>
                    <div className="md:p-2 p-0">{children}</div>
                </div>
            </div>
        </div>
        );
    }
}