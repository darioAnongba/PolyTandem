<?php

namespace AppBundle\Controller;

use AppBundle\Entity\LearningLanguage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/languages")
 */
class LanguageController extends Controller
{
    /**
     * @Route("/", name="languages")
     */
    public function indexAction(Request $request)
    {
        return $this->render('languages/index.html.twig', []);
    }

    /**
     * @Route("/new", name="newLanguage")
     */
    public function newLanguageAction(Request $request)
    {
        $link = new LearningLanguage($this->getUser());

        $form = $this->createFormBuilder($link)
            ->add('level', ChoiceType::class, array(
                'choices' => LearningLanguage::getLevels()))
            ->add('language')
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($link);
            $em->flush();

            $this->addFlash('notice', 'New language added');

            return $this->redirectToRoute('languages');
        }

        return $this->render('languages/newLanguage.html.twig', array(
            'form' => $form->createView()));
    }

    /**
     * @Route("/delete/{id}", name="deleteLanguage")
     */
    public function deleteLinkAction($id)
    {
        $repo = $this->getDoctrine()->getManager()->getRepository('AppBundle:LearningLanguage');
        $lang = $repo->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($lang);
        $em->flush();

        $this->addFlash('notice', 'language deleted : '.$lang->getLanguage().'.');

        return $this->redirectToRoute('languages');
    }
}