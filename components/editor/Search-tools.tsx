"use client";
import { FC, useState } from "react";
import SearchButton from "@/components/Search/SearchButton";
import SearchDataFetch from "@/components/Search/SearchDataFetch";
import SearchBar from "@/components/Search/SearchBar";
import PlagiarismChecker from "@/components/Search/PlagiarismChecker";
import Container from "@/components/Search/Container";
import LiteratureReview from "@/components/Search/literature_review";
import LiteraturePopup from "@/components/Search/literature_popup";
import ReferencePopup from "@/components/Search/ReferencePopup";
import Article from "@/components/Search/article";
import ImportPopup from "@/components/Search/import_popup";


const Search = () => {
  const [_searchRes, setSearchRes] = useState<unknown>(null);
  const [customLR, setCustomLR] = useState<boolean>(false);
  const [customRef, setCustomRef] = useState<boolean>(false);
  const [query, getQuery] = useState("");
  const [Searching, setSearchState] = useState<boolean>(false);
  const [engine, setEngine] = useState("semantic");
  const [popup, setShowPopup] = useState<boolean>(false);
  const [hasImportLr, setHasImportLr] = useState<boolean>(false)
  const [hasImportArt, setHasImportArt] = useState<boolean>(false)
  const [hasImportOut, setHasImportOut] = useState<boolean>(false)
  const [hasImportRef, setHasImportRef] = useState<boolean>(false)
  const [lrContent, setLrContent] = useState("");
  const [artContent, setArtContent] = useState("");
  const [reflst, setReflst] = useState("");
  const [projectName, setProjectName] = useState("")

  const [type, setType] = useState("lr");

  // This function get the query from the search bar
  const handleSearchInputChange = (e: any) => {
    getQuery(e.target.value);
    setSearchState(false);
  };
  // This function set the Research results output
  const handleSearchButtonClick = (e: any) => {
    setEngine(e.target.value);
    getQuery(query);
    setSearchState(true);
  };

  const handleClear=()=>{
    getQuery("");
  };
  function setText(value: string) {
    switch (type) {
      case "lr":
        setLrContent(value);
        break;
      case "art":
        setArtContent(value);
        break;
      case "out":
        setArtContent(value);
        break;
      case "ref":
        setReflst(value);
        break;
    }
  }
  function setHasImport(value:boolean) {
    switch (type) {
      case "lr":
        setHasImportLr(value);
        break;
      case "art":
        setHasImportArt(value);
        break;
      case "out":
        setHasImportOut(value);
        break;
      case "ref":
        setHasImportRef(value);
        break;
    }
  }

  return (
    <main className="search-main-editor">
      <SearchBar value={query} onChange={handleSearchInputChange} handleClear={handleClear} />
      {<Container>
          <div className="flex flex-col p-2 items-center"      
          style={{
            border:'1px solid #d9d9d9',
            borderRadius:'8px',
            height:'100%',
            width:'100%',
            backgroundColor:'white',
            justifySelf:'center'
            //position:'relative',
           // right:'10%',
           //left:'10%',
            //top:'15%'
          }}>
            <div className="flex flex-row items-center justify-center content-between h-fit w-fit">
              <div className="search-buttons">
                <SearchButton label="arxiv" onClick={handleSearchButtonClick} />
                <SearchButton label="archive" onClick={handleSearchButtonClick} />
              </div>
            </div>
            <SearchDataFetch
              searchEngine={engine}
              isSearching={Searching}
              query={query}
              onFetch={setSearchRes}
            />
          </div>
          
        </Container>}

       <Container>
          <LiteratureReview
            projectName={projectName}
            setHasImport={setHasImport}
            value={lrContent}
            query={query}
            importType={setType}
            setOutput={setLrContent}
            isImport={setShowPopup}
            hasImported = {hasImportLr}
          />
        </Container>
        <Container>
          <Article
            hasImportedArt={hasImportArt}
            hasImportedOut={hasImportOut}
            projectName={projectName}
            setHasImport={setHasImport}
            value={artContent}
            query={query}
            importType={setType}
            setOutput={setArtContent}
            isImport={setShowPopup}
          />
        </Container>
    </main>
  );
};

export default Search;