
// import { Form, Stack, Row, Col, Button } from "react-bootstrap"
// import CreatableReactSelect from "react-select/creatable"
// import { Link } from "react-router-dom"
// import { FormEvent, useRef, useState} from "react"
// import { useNavigate } from "react-router-dom"
// import { NoteData, Tag } from "./App"
// import {v4 as uuidV4} from "uuid"

// type NoteFormProps = {
//     onSubmit: (data: NoteData) => void
//     onAddTag: (tag: Tag) => void
//     availableTags: Tag[]
// } & Partial<NoteData>
// export function NoteForm({onSubmit, onAddTag, availableTags, title ="", markdown = "", tags = []}: NoteFormProps){
//     const titleRef = useRef<HTMLInputElement>(null)
//     const markdownRef = useRef<HTMLTextAreaElement>(null)
//     const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
//     const navigate = useNavigate()
//     function handleSubmit(e: FormEvent){
//         e.preventDefault()
//         onSubmit({
//             title: titleRef.current!.value,
//             markdown: markdownRef.current!.value,
//             tags: selectedTags
//         }
//         )
//         navigate("..")
//     }
//     return (
//     <Form onSubmit = {handleSubmit}> 
//         <Stack>
//             <Row>
//                 <Col>
//                 <Form.Group controlId = "title">
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control ref = {titleRef} required defaultValue = {title} />
//                 </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Group controlId = "tags">
//                     <Form.Label>Tags</Form.Label>
//                     <CreatableReactSelect 
//                     onCreateOption={label =>{
//                         const newTag = {id: uuidV4(), label}
//                         onAddTag(newTag)
//                         setSelectedTags(prev =>[...prev, newTag])
//                     }}
//                     value={selectedTags.map(tag =>{
//                         return {label: tag.label, value: tag.id}
//                     })}
//                     options={availableTags.map(tag =>{
//                         return {label: tag.label, value: tag.id}
//                     }
//                     )}
//                     onChange = {tags=>{setSelectedTags(tags.map(tag =>{
//                         return{
//                             label: tag.label, id: tag.value
//                         }
//                     }))
//                 }}
//                     isMulti />
//                 </Form.Group>
//                 </Col>
//             </Row>
//             <Form.Group controlId = "markdown">
//                     <Form.Label>Body</Form.Label>
//                     <Form.Control required as = "textarea" ref = {markdownRef} defaultValue = {markdown} rows= {15}/>
//                 </Form.Group>
//             <Stack direction="horizontal" gap = {2} className = "justify-content-end">
//                 <Button type = "submit" variant = "primary">Save</Button>
//                 <Link to = "..">
//                 <Button type = "button" variant = "outline-secondary">Cancel</Button>
//                 </Link>
//             </Stack>
//         </Stack>
//     </Form>
//     )
// } 
// src/NoteForm.tsx
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

// ... (previous imports)

// ... (previous imports)

export function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    tags = [],
  }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const pdfInputRef = useRef<HTMLInputElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const [selectedOption, setSelectedOption] = useState<string>("createNote");
    const navigate = useNavigate();
  
    function handleSubmit(e: FormEvent) {
      e.preventDefault();
      if (selectedOption === "createNote") {
        onSubmit({
          title: titleRef.current!.value,
          markdown: "", // Set markdown to empty string or handle it as needed
          tags: selectedTags,
        });
      } else if (selectedOption === "uploadPdf" && pdfInputRef.current?.files?.[0]) {
        // Handle PDF upload logic here
        const pdfFile = pdfInputRef.current.files[0];
        // Implement your logic for handling the uploaded PDF file
        console.log("Uploaded PDF:", pdfFile);
      }
      navigate("..");
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <Stack>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="noteType">
                <Form.Label>Note Type</Form.Label>
                <Form.Select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="createNote">Create Note</option>
                  <option value="uploadPdf">Upload PDF</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {selectedOption === "uploadPdf" && (
              <Col>
                <Form.Group controlId="pdfUpload">
                  <Form.Label>Upload PDF</Form.Label>
                  <Form.Control type="file" accept=".pdf" ref={pdfInputRef} />
                </Form.Group>
              </Col>
            )}
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
              </Form.Group>
            </Col>
          </Row>
          {selectedOption === "createNote" && (
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={15} />
            </Form.Group>
          )}
          <Stack direction="horizontal" gap={2} className="justify-content-end mt-5">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    );
  }
// import { Form, Stack, Row, Col, Button } from "react-bootstrap"
// import CreatableReactSelect from "react-select/creatable"
// import { Link } from "react-router-dom"
// import { FormEvent, useRef, useState} from "react"
// import { useNavigate } from "react-router-dom"
// import { NoteData, Tag } from "./App"
// import {v4 as uuidV4} from "uuid"

// type NoteFormProps = {
//     onSubmit: (data: NoteData) => void
//     onAddTag: (tag: Tag) => void
//     availableTags: Tag[]
// } & Partial<NoteData>
// export function NoteForm({onSubmit, onAddTag, availableTags, title ="", markdown = "", tags = []}: NoteFormProps){
//     const titleRef = useRef<HTMLInputElement>(null)
//     const markdownRef = useRef<HTMLTextAreaElement>(null)
//     const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
//     const navigate = useNavigate()
//     function handleSubmit(e: FormEvent){
//         e.preventDefault()
//         onSubmit({
//             title: titleRef.current!.value,
//             markdown: markdownRef.current!.value,
//             tags: selectedTags
//         }
//         )
//         navigate("..")
//     }
//     return (
//     <Form onSubmit = {handleSubmit}> 
//         <Stack>
//             <Row>
//                 <Col>
//                 <Form.Group controlId = "title">
//                     <Form.Label>Title</Form.Label>
//                     <Form.Control ref = {titleRef} required defaultValue = {title} />
//                 </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Group controlId = "tags">
//                     <Form.Label>Tags</Form.Label>
//                     <CreatableReactSelect 
//                     onCreateOption={label =>{
//                         const newTag = {id: uuidV4(), label}
//                         onAddTag(newTag)
//                         setSelectedTags(prev =>[...prev, newTag])
//                     }}
//                     value={selectedTags.map(tag =>{
//                         return {label: tag.label, value: tag.id}
//                     })}
//                     options={availableTags.map(tag =>{
//                         return {label: tag.label, value: tag.id}
//                     }
//                     )}
//                     onChange = {tags=>{setSelectedTags(tags.map(tag =>{
//                         return{
//                             label: tag.label, id: tag.value
//                         }
//                     }))
//                 }}
//                     isMulti />
//                 </Form.Group>
//                 </Col>
//             </Row>
//             <Form.Group controlId = "markdown">
//                     <Form.Label>Body</Form.Label>
//                     <Form.Control required as = "textarea" ref = {markdownRef} defaultValue = {markdown} rows= {15}/>
//                 </Form.Group>
//             <Stack direction="horizontal" gap = {2} className = "justify-content-end">
//                 <Button type = "submit" variant = "primary">Save</Button>
//                 <Link to = "..">
//                 <Button type = "button" variant = "outline-secondary">Cancel</Button>
//                 </Link>
//             </Stack>
//         </Stack>
//     </Form>
//     )
// }