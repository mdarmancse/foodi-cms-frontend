import { Form, Formik } from "formik";
import * as yup from "yup";
import { CommonLayout } from "../layouts";
import {
  FormikInputField,
  FormikSubmitButton,
  FormikToggleButton,
} from "../ui";
import { FormikSwitchButton } from "../ui/form/formik-switch-button.component";
import { Test } from "./test";

const PageTitle = "Dashboard";

export const Dashboard = () => {
  return (
    <CommonLayout
      breadcrumbItems={[{ name: "Dashboard" }]}
      active="dashboard"
      title={PageTitle}
    >
      <Formik
        initialValues={{
          first: "",
          second: "",
          1: "",
          2: "",
          switch: false,
          switch2: "",
        }}
        validationSchema={yup.object({
          switch: yup.boolean().required(),
          switch2: yup.boolean().required(),
        })}
      >
        {({ setFieldValue }) => (
          <Form>
            <FormikToggleButton
              name="first"
              toggleButtonProps={{
                label: "First",
                onChange(e) {
                  setFieldValue("first", 1);
                },
              }}
            />

            <br />
            <br />
            <br />
            <br />
            <div>
              <br />
              <Test setFieldValue={setFieldValue} />
            </div>

            <FormikInputField name="1" />

            <FormikInputField name="2" />

            <FormikSwitchButton
              name="switch"
              switchButtonProps={{
                label: "Is Delivery",
              }}
            />
            <FormikSwitchButton
              name="switch2"
              switchButtonProps={{
                label: "Switch 2",
              }}
            />

            <FormikSubmitButton>Submit</FormikSubmitButton>
          </Form>
        )}
      </Formik>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
        est quo repudiandae quibusdam blanditiis itaque assumenda reiciendis, in
        hic iste? Dolorum odio sunt sequi enim possimus deserunt illo,
        exercitationem tenetur vitae laboriosam eum ratione assumenda! Modi
        incidunt accusantium eum! Ullam veritatis enim sequi quo iste animi
        dolorem impedit, commodi eveniet minima fuga laudantium dicta odit nam
        facere quis recusandae quae non aut rerum ab! Qui magni fuga at
        consequatur? Facilis amet eos corrupti debitis deleniti doloribus minima
        vero laudantium eaque eligendi quisquam maiores quis consectetur tempore
        repudiandae quia, fugit explicabo in vel optio nesciunt. Optio ut rem
        sapiente at, necessitatibus fuga sunt! Eaque exercitationem labore
        quisquam nesciunt eos non accusantium mollitia eveniet alias, tempore
        commodi saepe? Aut optio molestiae mollitia dolorum, iure, et laborum
        sit debitis blanditiis ullam distinctio impedit cum alias aliquam!
        Corporis id repellat illum veniam incidunt autem, nam perferendis alias,
        natus sint et accusamus officiis dolorem tempore facilis odio excepturi
        cupiditate non ratione aliquam beatae. Aliquid quos minus laborum
        eligendi soluta numquam accusantium deserunt maxime repellat minima
        doloremque deleniti blanditiis dolore dolorem facere natus, magnam
        fugit. Adipisci voluptates nisi quidem. Commodi in quia suscipit ex
        laboriosam? Reiciendis, deleniti dolorem? Eveniet doloremque deserunt
        voluptas architecto, reiciendis repellendus dignissimos vero porro aut
        consectetur sapiente et voluptatibus minus, unde amet! Quasi, esse,
        delectus qui at possimus aliquam accusamus blanditiis, sapiente ab
        veniam voluptatem accusantium quisquam placeat quo rerum illo pariatur
        facere exercitationem? Aspernatur harum sequi quisquam, sint dicta
        architecto facere voluptatum, atque laborum itaque sapiente adipisci
        porro molestias culpa quos. Unde qui natus soluta consequatur itaque
        exercitationem, accusamus nostrum dolor, consectetur perspiciatis modi
        eos illo? Id voluptas rem qui minus eius est cumque nulla hic mollitia
        doloribus quas corporis asperiores nemo, expedita dolores quia. In
        laborum, molestias ea earum aut iste porro sit natus soluta a.
        Voluptatum ut laudantium aliquam magni perspiciatis, delectus eveniet
        voluptates ipsa deleniti! Nam accusamus quis porro consectetur similique
        libero reiciendis ipsa quaerat quibusdam eaque aperiam velit recusandae
        soluta repudiandae ducimus ab eius, provident quia rem aut? Commodi
        reprehenderit soluta minima, eligendi, sunt perferendis illo, sapiente
        in repudiandae ut totam corrupti! Minus, quidem praesentium ducimus a,
        incidunt corporis amet in ex nostrum suscipit atque excepturi vero
        sapiente necessitatibus corrupti eos voluptate recusandae culpa non
        laudantium! Quos error, amet quaerat laborum eaque quibusdam quam cumque
        accusamus sint suscipit dolorum obcaecati nemo quia perferendis
        cupiditate in inventore maiores ipsam tempore labore alias! Iste
        accusantium cum ipsa voluptatum id excepturi est, fuga aut distinctio?
        Minus blanditiis fuga optio nesciunt aperiam ipsam dignissimos et,
        aliquid sunt voluptatum placeat quod, deserunt quasi dolore magnam. Modi
        neque porro fugit enim recusandae autem magnam a voluptatibus aspernatur
        eum earum commodi iure nulla labore, illum maiores, repudiandae facilis
        nobis odit, id ab fugiat dolores pariatur! Laudantium amet recusandae
        facilis, pariatur officia commodi explicabo asperiores et ad voluptatem
        qui possimus ducimus iure, reprehenderit suscipit architecto dolorem
        similique. Magnam illum ipsum perspiciatis, provident velit, natus
        suscipit animi culpa distinctio corrupti maxime, cum aspernatur. Ipsam
        quam ea rerum laudantium blanditiis! Consequatur dolore recusandae
        labore cum reprehenderit expedita eum. Quos aut, asperiores sint tempora
        eum dolores facere porro, sunt molestiae dolorum iste, ullam voluptas.
        Fugit quo dolorum aliquid consequuntur non suscipit accusantium, sit,
        culpa facere ipsa fuga alias error quae est dolor vitae labore!
        Molestias deleniti molestiae explicabo minima debitis repellendus
        deserunt ipsam. Consequatur, magni excepturi? Quam sint qui dolores,
        incidunt consectetur vel sit laboriosam. Incidunt, velit quo. Blanditiis
        asperiores eaque quaerat mollitia accusantium quae aperiam sapiente
        assumenda fuga? Obcaecati facere ipsa blanditiis quis fugiat
        perspiciatis maiores doloribus aperiam consequatur iure, modi eaque
        delectus. Natus, molestias temporibus dolores suscipit quisquam
        voluptatem aliquid fugiat nihil quidem sunt facere, aspernatur explicabo
        aut perspiciatis laudantium quam sit. Quod recusandae excepturi magni
        enim temporibus iusto! Maiores, nesciunt expedita? Asperiores obcaecati
        voluptatem rem, minima saepe laboriosam. A at qui veritatis consectetur
        eveniet natus eligendi, veniam, fuga molestiae sequi, obcaecati nostrum
        quidem esse omnis? Dolorem repellendus, nisi quidem, iusto quod, nobis
        fugiat ratione temporibus asperiores sapiente quam recusandae et in
        placeat veritatis libero! Quibusdam, maxime? Debitis dignissimos facere
        aliquid ducimus, nemo quae asperiores? Rem nostrum dolore minima
        voluptatibus saepe reprehenderit soluta, facere eos nulla molestiae
        architecto labore quam aspernatur. Dolores similique nisi quisquam
        laudantium, distinctio, minima a eos corrupti consequuntur asperiores
        mollitia vel itaque dolorem aspernatur architecto maxime aliquam nostrum
        totam, libero et minus dolorum autem? Perspiciatis rem repellat aperiam
        perferendis, deserunt optio. Facilis, blanditiis? At velit assumenda
        reiciendis laborum aspernatur. Quae blanditiis a repellat aliquid
        officia necessitatibus corporis eum aut saepe, assumenda repellendus
        quis totam reprehenderit, animi eaque excepturi unde delectus, nostrum
        sed perferendis! Consequatur, delectus nesciunt! Natus ipsam voluptate
        pariatur reprehenderit, perferendis quaerat excepturi repellat, mollitia
        alias facilis reiciendis impedit harum. At laborum et accusantium
        perferendis illo dignissimos exercitationem aliquid commodi, tempora
        recusandae illum iusto hic, nisi error placeat in ipsam dicta nostrum?
        Veniam natus, officia nulla dolorum aperiam, illum, consectetur omnis
        iste doloribus repellat voluptatem perspiciatis suscipit error eaque
        fuga rem debitis nemo voluptate nihil. Rem sapiente mollitia maiores
        nostrum dignissimos veniam tempore ullam ab ratione. Facilis saepe amet
        assumenda eligendi, vel repellat sint accusantium, neque ullam illum
        eius, eveniet ducimus tempora mollitia ut? Unde consectetur voluptatem
        ut veniam nihil pariatur beatae voluptatum, deserunt tempora rem
        expedita quibusdam quod mollitia quisquam dolore! Enim, sed at eligendi
        quidem sint culpa eos numquam velit! Accusamus libero laudantium aliquam
        veniam officiis eligendi, eaque aperiam distinctio asperiores assumenda
        accusamus blanditiis exercitationem expedita et iusto qui beatae alias,
        ducimus nobis, deleniti inventore explicabo dicta. Labore beatae quasi
        soluta incidunt nesciunt, quod mollitia recusandae ullam necessitatibus
        ratione voluptate rem, repellendus animi explicabo. Repudiandae natus
        voluptatem, unde earum quisquam quae aliquam dolor ullam suscipit
        provident. Quia, neque. Nam quae corrupti omnis qui, cupiditate eos
        tempore doloremque voluptate eius earum accusantium consequatur quasi
        obcaecati culpa molestias veniam exercitationem laboriosam. Deleniti
        ducimus neque illo esse aspernatur sed, ipsum repellat quo nulla!
        Accusamus, et vel. Consequuntur, dolorum. Voluptate maxime expedita
        aspernatur perspiciatis ea saepe minus, animi libero asperiores soluta!
        Soluta quas animi laborum fuga tempore a. Rerum eius commodi et quam
        maxime repellendus tempore. Ipsam voluptas dolor quidem officiis. Eum
        provident aperiam sunt eius accusantium optio iste enim adipisci nemo
        reprehenderit, quo suscipit numquam dignissimos mollitia aut veniam
        debitis perferendis distinctio! Consequatur quam quo officia unde enim
        eum dicta dolorem quaerat ut vitae iure voluptatibus rerum, mollitia
        fugit veniam, natus atque? Maxime veritatis numquam repellendus eaque,
        voluptatibus molestiae amet asperiores quod possimus quidem deleniti
        voluptate ipsum, sequi quia aliquid? Et, aperiam exercitationem
        voluptatibus aut iure officia aliquid, sit veniam, commodi soluta dolore
        maxime. Dolore vel obcaecati corrupti tenetur soluta explicabo, dolorem
        culpa recusandae unde totam nihil necessitatibus rem labore magnam,
        odio, quia illum. Maiores, tempore possimus, placeat, sapiente dolore
        nisi quia consequuntur amet dolorum deleniti dicta voluptates nobis
        ipsam fugit. Mollitia maxime voluptatibus facilis itaque illo atque amet
        repudiandae debitis eligendi, quibusdam perferendis deserunt tenetur
        maiores natus reprehenderit sunt sint quam, unde porro suscipit animi
        laborum incidunt adipisci repellat. Aliquam adipisci rem ullam cumque
        sed, molestias delectus quisquam labore culpa rerum repudiandae, soluta
        incidunt ipsam voluptatum! Distinctio dolor amet maiores, dolores
        facilis veniam ipsa rerum dignissimos nulla accusantium id! Culpa
        suscipit distinctio dicta magni, totam facilis aliquam. Quidem vel odio
        nihil modi magnam? Quidem odio possimus optio iste excepturi sed eum est
        iusto illum ipsam in eius, voluptate nisi rem officia quam ratione ab
        soluta assumenda? Harum pariatur natus, nisi id libero sint consectetur
        debitis cupiditate quam repudiandae consequuntur laboriosam nulla
        voluptatibus labore et rerum exercitationem ab, eaque excepturi alias.
        Libero quaerat nesciunt rerum autem? Vel recusandae, quo corporis
        facilis dolores distinctio quod, quas veritatis vitae debitis repellat
        nulla dolorem harum dolor perspiciatis nesciunt hic exercitationem
        labore autem numquam libero quasi pariatur! Enim cupiditate officia hic
        nemo accusamus voluptates nam dolorum ducimus, possimus earum facilis
        pariatur unde dicta illo illum doloremque quibusdam? Non, dolor
        molestiae. Praesentium quos dolor sapiente rerum voluptates molestias ab
        ea odit saepe tempore repellendus id cumque, perspiciatis officiis rem
        earum excepturi voluptatum iusto at cupiditate laboriosam dolores.
        Culpa, corporis incidunt autem pariatur temporibus odit vero alias nisi
        suscipit rerum veniam velit nulla debitis ab consequuntur error eligendi
        neque iusto amet sapiente quos omnis reiciendis id. Adipisci libero vel
        ad culpa similique magni doloribus non aliquid facere omnis asperiores
        placeat voluptatibus obcaecati veniam laudantium nemo aspernatur, cumque
        repellat atque sequi. Ipsam, provident delectus officiis eveniet
        similique assumenda non illum, maxime quibusdam voluptatum molestiae
        aliquid? Sed tenetur repellendus asperiores ducimus officia
        reprehenderit laborum doloribus fugit porro in nemo quasi, id nisi
        recusandae nam repudiandae! Quaerat incidunt maiores perferendis eius?
        Vitae aut perspiciatis eius? Ipsa vel recusandae molestiae similique
        numquam ipsum maiores error enim dolores ut et ducimus, natus porro
        possimus assumenda animi, alias, ab hic beatae. Nam, autem? Explicabo et
        praesentium itaque veritatis sapiente vitae, quam minus quae earum quis
        possimus quos debitis omnis numquam dolores rem eius distinctio vero
        accusantium amet, autem voluptas magni. Quia eos, repellat odio quidem
        ut dicta tempore aliquid aut minima exercitationem tempora eligendi
        similique deleniti voluptatibus est laboriosam cupiditate illo nihil
        aliquam non blanditiis voluptatum incidunt corrupti? Laudantium
        laboriosam quaerat itaque? Labore numquam molestiae doloremque, non
        fugiat iusto aspernatur dolores provident et saepe error fuga. Harum
        tempore laudantium veritatis eaque rerum, adipisci placeat aspernatur
        dolorem commodi sit repellendus quae voluptatibus culpa fuga voluptate
        sunt itaque, impedit magni perspiciatis quia minima quis voluptatum.
        Tenetur nisi ipsa a voluptatibus vel quam natus nesciunt tempora saepe
        ea praesentium inventore porro dolorum ex excepturi eaque sed sunt
        cupiditate libero ut, possimus error! Libero cum veniam nemo minus
        sapiente non. Corrupti dolorem a possimus labore ducimus illo deserunt
        atque. Blanditiis velit molestias sed recusandae hic. Dignissimos ut
        blanditiis minus debitis consectetur ipsa totam, cupiditate sunt harum
        laboriosam maiores cumque! Accusantium corporis voluptatum cum rerum ut
        deleniti natus asperiores sint, fuga laborum dolor repudiandae officia
        nobis. Officiis, quod. Explicabo, assumenda reprehenderit! At voluptatum
        eos aliquid odit autem est.
      </p>
    </CommonLayout>
  );
};
