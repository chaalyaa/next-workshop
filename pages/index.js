import { Navbar } from "@/src/components/navbar.component";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";

import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [visible, setVisible] = useState(false);
  
  function onChangeModal(){
    setVisible(!visible);
  }

  return (
    <div>
      <Navbar/>
      <h1 className={'text-red-500'}>HOME PAGES</h1>


      <Modal 
        visible={visible}
        onChange={onChangeModal}>

          <div className={'w-full flex items-center justify-between'}>
            <h3>Title Here</h3>

            <Button
              htmlType={'button'}
              type={'default'}
              className={'btn-default'}
              onClick={onChangeModal}
              >Close</Button>
          </div>

          

      </Modal>

      <div className={'h-screen w-full'}>
        <Image
          width={700}
          height={700}
          src={'/Flowchart.png'}>
        </Image>
      </div>

      <div className={'h-screen w-full'}>
        <Image
          width={700}
          height={700}
          src={'/Otoritas Jasa Keuangan-modified.png'}>
        </Image>
      </div>
      

      <Button
        htmlType={'button'}
        type={'default'}
        className={'btn-warning'}
        onClick={(c)=>{
          console.log(c, 'BUTTON 1')
        }}
        >Button 1</Button>

      <Button
        htmlType={'button'}
        type={'primary'}
        className={'btn-danger'}
        onClick={(c)=>{
          console.log(c, 'BUTTON 2')
        }}
        >Button 2</Button>

      <Button
        htmlType={'button'}
        type={'default'}
        onClick={onChangeModal}
        className={'btn-primary'}
        >Trigger Modal</Button>
    </div>
  )
}
