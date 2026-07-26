import { useState } from "react";
import api from "../services/api";
import "../styles/upload.css";


function UploadDocs() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);



    const handleUpload = async () => {


        if (!file) {

            setMessage("Please select a file");

            return;
        }



        const formData = new FormData();

        formData.append("file", file);



        try {

            setLoading(true);

            setMessage("Uploading document...");

            setSummary(null);



            const uploadResponse = await api.post(
                "/documents/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );



            const filename = uploadResponse.data.filename;



            setMessage(
                `${filename} uploaded successfully`
            );



            // Get AI Summary

            const summaryResponse = await api.get(
                `/documents/${filename}/summary`
            );



            setSummary(
                summaryResponse.data
            );


        } 
        
        catch(error) {

            console.log(error);

            setMessage(
                "Upload failed"
            );

        }


        finally {

            setLoading(false);

        }

    };



    return (

        <div className="upload-page">


            <div className="upload-card">


                <h1>
                    📂 Upload Documents
                </h1>


                <p>
                    Upload company documents for AI analysis
                </p>



                <input

                    type="file"

                    accept=".pdf,.doc,.docx,.txt"

                    onChange={(e)=>
                        setFile(e.target.files[0])
                    }

                />



                <button

                    onClick={handleUpload}

                    disabled={loading}

                >

                    {
                        loading
                        ?
                        "Processing..."
                        :
                        "Upload Document"
                    }


                </button>



                <h3>
                    {message}
                </h3>



                {
                    summary && (

                        <div className="summary-card">


                            <h2>
                                🤖 AI Summary
                            </h2>



                            <p>
                                {summary.analysis?.summary}
                            </p>



                            <h3>
                                Key Points
                            </h3>



                            <ul>

                                {
                                    summary.analysis?.key_points?.map(
                                        (item,index)=>(
                                            <li key={index}>
                                                {item}
                                            </li>
                                        )
                                    )
                                }

                            </ul>



                        </div>

                    )
                }



            </div>


        </div>

    );

}


export default UploadDocs;