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
                            <div className="flex items-center justify-center text-xl text-white bg-purple-600 md:h-12 md:w-12 w-10 h-10 font-bold rounded-full shadow-md hover:shadow-lg">
                                {number}
                            </div>
                        </div>
                        <div className="w-full mx-2">
                            <div className="flex flex-row">
                                <div className="mr-2 font-semibold">Date</div>
                                <div>{this.props.highlightedContent[i][1]}</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="mr-2 font-semibold">Count:</div>
                                <div>{this.props.highlightedContent[i][2]}</div>
                            </div>
                            <div>
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

        return (
        <div className="flex flex-col md:flex-row my-6 w-full rounded-lg
        text-white
        backdrop-blur-lg
        [ bg-gradient-to-b from-white/30 to-white/20 ]
        [ border-[1px] border-solid border-white border-opacity-30 ]
        [ shadow-black/70 shadow-2xl">
            <div className="flex flex-col md:p-6 p-3.5 items-center justify-center text-white bg-purple-600 rounded-l-lg">
                <div className="mx-1 md:text-2xl text-xl font-semibold">Filename: </div>
                <div className="mx-2">{this.props.filename}</div>
            </div>
            <div className="flex flex-col md:p-6 p-4">
                <div className="flex items-center flex-row my-2">
                    <div className="mx-1 text-xl font-semibold">Date: </div>
                    <div className="mx-2">{this.props.date}</div>
                </div>
                <div className="flex items-center flex-row my-2">
                    <div className="mx-1 text-xl font-semibold">Keyword: </div>
                    <div className="mx-2">{this.props.keyword}</div>
                </div>
                <div className="p-1">
                    <div className="my-2 mb-0 text-xl font-semibold">Result:</div>
                    <div className="md:p-4 p-0">{children}</div>
                </div>
            </div>
        </div>
        );
    }
}